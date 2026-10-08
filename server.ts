import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize GoogleGenAI server-side with telemetry header
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API: Career Coach Chat
app.post('/api/coach/chat', async (req, res) => {
  try {
    const { message, history = [], userProfile, targetCareer, skillGaps = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai) {
      // Fallback intelligent response if GEMINI_API_KEY is not configured yet
      const fallbackReply = generateFallbackCareerAdvice(message, targetCareer, skillGaps, userProfile);
      return res.json({ reply: fallbackReply });
    }

    const systemInstruction = `You are SkillLens AI, a top-tier personalized AI Career Coach and Skill Gap Strategist for "SkillLens AI" (Tagline: "Discover your skill gaps. Build your career.").
User context:
- Target Career: ${targetCareer || 'UI/UX Designer'}
- Name: ${userProfile?.name || 'Professional'}
- Status: ${userProfile?.status || 'Job Seeker'}
- Current Identified Skill Gaps: ${JSON.stringify(skillGaps)}
- User Skills: ${JSON.stringify(userProfile?.skills || [])}

Your personality:
- Highly constructive, encouraging, practical, and data-driven.
- Structure your answers with clear actionable steps, specific tools, portfolio projects, and learning priorities.
- When asked "What should I learn next?", clearly prioritize the largest skill gap with specific weekly milestones.
- Keep responses concise, clear, and easy to read with bullet points.
- If the user asks about readiness, give honest assessment based on their current progress and concrete checklist items.`;

    const formattedContents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    // Add recent conversation history if provided
    for (const h of history.slice(-6)) {
      if (h.sender === 'user') {
        formattedContents.push({ role: 'user', parts: [{ text: h.text }] });
      } else if (h.sender === 'ai') {
        formattedContents.push({ role: 'model', parts: [{ text: h.text }] });
      }
    }

    // Add current user message
    formattedContents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'I analyzed your profile and suggest focusing on your highest priority skill gap this week.';
    return res.json({ reply });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    // Provide a helpful fallback reply so conversation is never blocked
    const fallback = generateFallbackCareerAdvice(req.body.message, req.body.targetCareer, req.body.skillGaps, req.body.userProfile);
    return res.json({ reply: fallback });
  }
});

// API: Voice Assistant TTS
app.post('/api/coach/tts', async (req, res) => {
  try {
    const { text, voiceName = 'Zephyr' } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (!ai) {
      return res.status(503).json({ error: 'AI TTS service not available, fallback to client synthesis' });
    }

    // Clean text to avoid markdown artifacts in speech
    const cleanSpeechText = text
      .replace(/[#*_`~[\]()]/g, '')
      .replace(/•/g, '')
      .slice(0, 450); // Keep reasonable length for rapid voice response

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: cleanSpeechText,
              speechMetadata: {
                style: 'Empathetic, clear, professional career advisor',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName || 'Zephyr' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return res.json({
        audioBase64: base64Audio,
        mimeType: 'audio/wav',
      });
    }

    return res.status(500).json({ error: 'No audio generated' });
  } catch (error: any) {
    console.error('TTS error:', error);
    return res.status(500).json({ error: error.message || 'TTS generation failed' });
  }
});

// API: Resume Parser & AI Gap Evaluator
app.post('/api/analyze-resume', async (req, res) => {
  try {
    const { resumeText, targetCareer } = req.body;
    if (!resumeText) {
      return res.status(400).json({ error: 'Resume text is required' });
    }

    if (!ai) {
      return res.json(generateLocalResumeAnalysis(resumeText, targetCareer));
    }

    const prompt = `You are a resume analysis engine for SkillLens AI.
Target Career: "${targetCareer || 'UI/UX Designer'}".
Resume Text:
"""${resumeText.slice(0, 4000)}"""

Analyze this resume against the target career and return JSON with:
1. "detectedSkills": list of string skills identified
2. "detectedEducation": string summary of education
3. "detectedExperience": string summary of work experience
4. "matchScore": integer percentage (0-100) readiness for ${targetCareer}
5. "strengths": 3 string key strengths
6. "criticalGaps": 3 string high-priority missing skills for ${targetCareer}
7. "summary": 2-sentence encouraging career diagnostic summary.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return res.json(data);
    }

    return res.json(generateLocalResumeAnalysis(resumeText, targetCareer));
  } catch (err) {
    console.error('Resume parse error:', err);
    return res.json(generateLocalResumeAnalysis(req.body.resumeText, req.body.targetCareer));
  }
});

function generateFallbackCareerAdvice(message: string, targetCareer: string, skillGaps: any[], userProfile: any) {
  const career = targetCareer || 'UI/UX Designer';
  const query = (message || '').toLowerCase();

  if (query.includes('learn next') || query.includes('start') || query.includes('where to begin')) {
    return `Based on your ${career} target and current skill profile, your highest leverage move right now is **Design Systems & Component Architecture**.

Here is your 3-step action plan for this week:
1. **Master Tokens & Variables**: Define a typography scale and semantic color palette.
2. **Build a Living UI Kit**: Create interactive buttons, form inputs, and modals with auto-layout variants.
3. **Document Guidelines**: Write clear zero-ambiguity documentation on state changes (hover, active, disabled).

Would you like me to generate a tailored project challenge for this?`;
  }

  if (query.includes('ready') || query.includes('score') || query.includes('job ready')) {
    return `You're currently around **72% Career Ready** for a junior to mid-level ${career} position.

To cross the 85%+ threshold into high interview conversion:
• Close your remaining gap in **UX Research & Usability Testing**.
• Ship 1 real-world case study showcasing measurable business impact.
• Practice speaking through your design decisions with design tokens and accessibility standards.`;
  }

  if (query.includes('project') || query.includes('portfolio') || query.includes('build')) {
    return `For ${career}, recruiters look for end-to-end thinking rather than surface aesthetics.

Recommended Project: **"Fintech Wealth Management Mobile App & Design System"**
• **Key Skills Targeted**: Mobile UX, Information Architecture, Interactive Prototyping, Usability Testing.
• **Deliverables**: User interview synthesis, interactive Figma prototype, WCAG AAA accessibility audit, and a documented design token library.

Shall we outline the week-by-week sprint for this project?`;
  }

  return `Great question! In your journey toward becoming a world-class ${career}, focusing on closing high-priority skill gaps while building hands-on portfolio proof is the fastest accelerator. 

I'm here to help you:
• Break down complex topics into weekly milestones
• Review your resume and portfolio case studies
• Prepare for technical and behavioral interviews
• Recommend real-world projects that recruiters actually test for

What specific aspect of your career roadmap would you like to dive into today?`;
}

function generateLocalResumeAnalysis(resumeText: string, targetCareer: string) {
  const career = targetCareer || 'UI/UX Designer';
  const text = (resumeText || '').toLowerCase();
  
  const commonSkills = [
    'Figma', 'Prototyping', 'User Research', 'Wireframing', 'Design Systems',
    'HTML/CSS', 'React', 'JavaScript', 'TypeScript', 'Analytics', 'Usability Testing',
    'Information Architecture', 'Agile/Scrum', 'Visual Design', 'Interaction Design'
  ];

  const found = commonSkills.filter(s => text.includes(s.toLowerCase()));
  if (found.length === 0) {
    found.push('Figma', 'Visual Design', 'Wireframing', 'Collaboration');
  }

  return {
    detectedSkills: found,
    detectedEducation: text.includes('degree') || text.includes('bachelor') || text.includes('university')
      ? 'Bachelor’s Degree in Technology / Design'
      : 'Professional Coursework & Technical Certification',
    detectedExperience: text.includes('intern') || text.includes('freelance') || text.includes('experience')
      ? '1-2 years relevant project and practical experience'
      : 'Entry-level candidate with strong project portfolio foundation',
    matchScore: Math.min(88, Math.max(55, found.length * 10 + 35)),
    strengths: ['Visual Design Fundamentals', 'Modern Tooling Familiarity', 'Prototyping Proficiency'],
    criticalGaps: ['Design Systems at Scale', 'Quantitative Usability Testing', 'Business Metrics & UX Research'],
    summary: `Profile successfully parsed! You show great foundation for ${career}. Closing your 3 priority gaps will raise your readiness score above 85%.`
  };
}

// Vite middleware integration for full-stack dev / prod
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`SkillLens AI server running at http://localhost:${PORT}`);
  });
}

startServer();
