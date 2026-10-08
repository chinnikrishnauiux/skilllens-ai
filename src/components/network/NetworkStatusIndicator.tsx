import React, { useState } from 'react';
import {
  Wifi,
  WifiOff,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Database,
  Cloud,
  CloudOff,
  ChevronDown,
  X,
  Radio,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NetworkStatusIndicator: React.FC = () => {
  const {
    isOnline,
    syncStatus,
    pendingSyncCount,
    lastSyncedAt,
    triggerManualSync,
    isSimulatedOffline,
    toggleSimulateOffline,
    triggerSyncIssueTest,
  } = useApp();

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);

  // If status is online and synced, banner is naturally hidden unless details modal is opened
  const showBanner = !isBannerDismissed && (syncStatus === 'offline' || syncStatus === 'sync_issue' || syncStatus === 'syncing');

  return (
    <>
      {/* 1. Global Notice Banner when Offline or Sync Issue */}
      {showBanner && (
        <div
          role="status"
          aria-live="polite"
          className={`w-full text-xs font-semibold px-4 py-2.5 transition-all duration-300 flex items-center justify-between shadow-sm relative z-50 ${
            syncStatus === 'offline'
              ? 'bg-amber-500 text-amber-950 border-b border-amber-600/30'
              : syncStatus === 'sync_issue'
              ? 'bg-rose-500 text-white border-b border-rose-600/30'
              : 'bg-[#6C63FF] text-white border-b border-[#5a52e0]'
          }`}
        >
          <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              {syncStatus === 'offline' ? (
                <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-amber-600/20 shrink-0">
                  <WifiOff className="w-3.5 h-3.5 text-amber-950 animate-pulse" />
                </div>
              ) : syncStatus === 'sync_issue' ? (
                <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-white/20 shrink-0">
                  <AlertTriangle className="w-3.5 h-3.5 text-white" />
                </div>
              ) : (
                <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-white/20 shrink-0">
                  <RefreshCw className="w-3.5 h-3.5 text-white animate-spin" />
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-extrabold tracking-wide uppercase text-[10px] px-1.5 py-0.5 rounded bg-black/10">
                  {syncStatus === 'offline'
                    ? isSimulatedOffline
                      ? 'OFFLINE MODE (SIMULATED)'
                      : 'OFFLINE'
                    : syncStatus === 'sync_issue'
                    ? 'SYNC ISSUE DETECTED'
                    : 'SYNCING CHANGES'}
                </span>
                <span className="text-xs">
                  {syncStatus === 'offline'
                    ? 'Your changes and roadmap progress are cached locally and safe on this device. They will automatically sync when you reconnect.'
                    : syncStatus === 'sync_issue'
                    ? `${pendingSyncCount > 0 ? `${pendingSyncCount} pending updates cached locally.` : 'Sync failed.'} Connection unstable. Your local progress is protected.`
                    : 'Synchronizing local career progress with cloud servers...'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {syncStatus === 'sync_issue' && (
                <button
                  onClick={triggerManualSync}
                  className="px-3 py-1 bg-white text-rose-600 hover:bg-gray-100 rounded-lg text-xs font-bold transition flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Retry Sync</span>
                </button>
              )}

              {syncStatus === 'offline' && isSimulatedOffline && (
                <button
                  onClick={toggleSimulateOffline}
                  className="px-3 py-1 bg-amber-950 text-amber-100 hover:bg-black rounded-lg text-xs font-bold transition flex items-center gap-1"
                >
                  <span>Reconnect</span>
                </button>
              )}

              <button
                onClick={() => setIsDetailsOpen(true)}
                className="px-2.5 py-1 bg-black/10 hover:bg-black/20 rounded-lg text-[11px] font-bold transition"
              >
                Cache Details
              </button>

              <button
                onClick={() => setIsBannerDismissed(true)}
                className="p-1 hover:bg-black/10 rounded-md transition text-inherit opacity-75 hover:opacity-100"
                title="Dismiss Banner"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Compact Sync Status Indicator Pill (Fixed corner badge / trigger) */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsDetailsOpen(!isDetailsOpen)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-semibold backdrop-blur-md shadow-lg transition-all transform hover:scale-102 ${
            !isOnline
              ? 'bg-amber-500/90 border-amber-600 text-amber-950 ring-2 ring-amber-500/30'
              : syncStatus === 'sync_issue'
              ? 'bg-rose-50 border-rose-300 text-rose-800 ring-2 ring-rose-500/20'
              : syncStatus === 'syncing'
              ? 'bg-indigo-50 border-indigo-200 text-[#6C63FF]'
              : 'bg-white/95 border-gray-200/80 text-gray-700 hover:border-[#6C63FF]/40'
          }`}
          title="Click to view network & local cache sync status"
        >
          <div className="relative flex items-center justify-center">
            {!isOnline ? (
              <WifiOff className="w-3.5 h-3.5 text-amber-950 animate-pulse" />
            ) : syncStatus === 'sync_issue' ? (
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            ) : syncStatus === 'syncing' ? (
              <RefreshCw className="w-3.5 h-3.5 text-[#6C63FF] animate-spin" />
            ) : (
              <div className="relative flex items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute" />
              </div>
            )}
          </div>

          <div className="text-left hidden sm:block">
            <span className="text-[11px] font-bold block leading-tight">
              {!isOnline
                ? 'Offline (Cached)'
                : syncStatus === 'sync_issue'
                ? 'Sync Warning'
                : syncStatus === 'syncing'
                ? 'Syncing...'
                : 'Progress Synced'}
            </span>
          </div>

          {pendingSyncCount > 0 && (
            <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-full bg-black/10 text-inherit">
              {pendingSyncCount}
            </span>
          )}
        </button>

        {/* 3. Detailed Cache & Network Status Popover */}
        {isDetailsOpen && (
          <div className="absolute bottom-12 left-0 w-80 sm:w-96 bg-white rounded-3xl border border-gray-200 p-5 shadow-2xl space-y-4 animate-fadeIn text-[#171A2B]">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-[#6C63FF]" />
                <h4 className="font-bold text-sm">Network & Cache Status</h4>
              </div>
              <button
                onClick={() => setIsDetailsOpen(false)}
                className="p-1 text-gray-400 hover:text-black rounded-lg hover:bg-gray-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Status Summary Banner */}
            <div
              className={`p-3.5 rounded-2xl border text-xs space-y-1.5 ${
                !isOnline
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : syncStatus === 'sync_issue'
                  ? 'bg-rose-50 border-rose-200 text-rose-900'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5">
                  {!isOnline ? (
                    <WifiOff className="w-3.5 h-3.5 text-amber-700" />
                  ) : syncStatus === 'sync_issue' ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  )}
                  <span>
                    {!isOnline
                      ? 'Local Offline Storage Active'
                      : syncStatus === 'sync_issue'
                      ? 'Sync Interrupted'
                      : 'Connected & Cloud Synchronized'}
                  </span>
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/70">
                  {syncStatus}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed opacity-90">
                {!isOnline
                  ? 'Any skills updated or roadmap tasks checked off are stored in your device storage and will be submitted automatically when connectivity resumes.'
                  : syncStatus === 'sync_issue'
                  ? 'Failed to contact the remote sync server. Your local database remains intact.'
                  : 'Your latest skill scores, roadmap progress, and AI chat logs are safely synced.'}
              </p>
            </div>

            {/* Diagnostic Information */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-gray-100 text-gray-600">
                <span>Network Connection:</span>
                <span className="font-bold text-[#171A2B]">
                  {isOnline ? 'Online (HTTP 200)' : 'Disconnected (Offline)'}
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-gray-100 text-gray-600">
                <span>Local Progress Cache:</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Active (LocalStorage)
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-gray-100 text-gray-600">
                <span>Pending Offline Updates:</span>
                <span className="font-bold text-[#171A2B]">
                  {pendingSyncCount} changes queued
                </span>
              </div>

              <div className="flex justify-between py-1.5 text-gray-600">
                <span>Last Cloud Sync:</span>
                <span className="font-bold text-[#171A2B]">
                  {lastSyncedAt ? lastSyncedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'Never'}
                </span>
              </div>
            </div>

            {/* Interactive Testing & Recovery Buttons */}
            <div className="pt-2 border-t border-gray-100 space-y-2">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    triggerManualSync();
                    setIsBannerDismissed(false);
                  }}
                  disabled={!isOnline}
                  className="flex-1 py-2 px-3 bg-[#6C63FF] hover:bg-[#5b52e0] disabled:opacity-40 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Sync Now</span>
                </button>

                <button
                  onClick={() => {
                    toggleSimulateOffline();
                    setIsBannerDismissed(false);
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition border ${
                    isSimulatedOffline
                      ? 'bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200'
                      : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
                  }`}
                  title="Simulate going offline to test offline caching"
                >
                  {isSimulatedOffline ? 'Resume Online' : 'Simulate Offline'}
                </button>
              </div>

              <button
                onClick={() => {
                  triggerSyncIssueTest();
                  setIsBannerDismissed(false);
                }}
                className="w-full py-1.5 text-[11px] font-semibold text-gray-500 hover:text-rose-600 transition text-center"
              >
                Simulate Sync Issue Warning
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
