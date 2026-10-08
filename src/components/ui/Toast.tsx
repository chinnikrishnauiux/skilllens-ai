import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast || !toast.show) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-500" />,
    info: <Info className="w-5 h-5 text-[#6C63FF]" />,
  };

  const bgStyles = {
    success: 'border-emerald-500/20 bg-emerald-50/90 text-emerald-900',
    error: 'border-rose-500/20 bg-rose-50/90 text-rose-900',
    warning: 'border-amber-500/20 bg-amber-50/90 text-amber-900',
    info: 'border-[#6C63FF]/20 bg-indigo-50/90 text-indigo-950',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-xl backdrop-blur-md text-sm font-semibold max-w-md ${
          bgStyles[toast.type]
        }`}
      >
        {icons[toast.type]}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
