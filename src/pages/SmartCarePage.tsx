import React, { useState, useEffect } from 'react';
import {
  Video,
  Sparkles,
  ShieldCheck,
  Bell,
  History,
  Camera,
  Settings,
  Dog,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ChevronRight,
  Info,
  Layers,
  ArrowRight,
  ShoppingBag
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { LiveCameraView } from '../components/smart-care/LiveCameraView';
import { AiTickCheckView } from '../components/smart-care/AiTickCheckView';
import { CameraDeviceManager } from '../components/smart-care/CameraDeviceManager';
import { ScanHistoryView } from '../components/smart-care/ScanHistoryView';
import { CameraSetupWizard } from '../components/smart-care/CameraSetupWizard';
import { SmartCarePrivacyModal } from '../components/smart-care/SmartCarePrivacyModal';
import { VetContactModal } from '../components/smart-care/VetContactModal';
import { SmartCareHardwareSection } from '../components/smart-care/SmartCareHardwareSection';
import { TickScanArea } from '../types';

type SmartCareTab = 'dashboard' | 'live-cam' | 'ai-tick-check' | 'devices' | 'history' | 'alerts';

export const SmartCarePage: React.FC = () => {
  const {
    user,
    cameras,
    activeCamera,
    scanHistory,
    smartAlerts,
    unreadAlertsCount,
    markAlertRead,
    clearAlerts,
    navigate,
    routeParams
  } = useShop();

  const [activeTab, setActiveTab] = useState<SmartCareTab>(
    (routeParams?.tab as SmartCareTab) || 'dashboard'
  );
  const [isSetupWizardOpen, setIsSetupWizardOpen] = useState<boolean>(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);
  const [isVetModalOpen, setIsVetModalOpen] = useState<boolean>(false);

  // Frame passed from Live Cam to AI Tick Check
  const [tickScanFrame, setTickScanFrame] = useState<string | null>(null);
  const [tickScanArea, setTickScanArea] = useState<TickScanArea>('BACK');

  // Handle route params if passed
  useEffect(() => {
    if (routeParams?.tab) {
      setActiveTab(routeParams.tab as SmartCareTab);
    }
  }, [routeParams]);

  const dogName = user?.dogProfile?.name || 'Your Pet';
  const dogBreed = user?.dogProfile?.breed || 'Labrador Retriever';

  const handleOpenTickScanWithFrame = (frame: string, area: TickScanArea) => {
    setTickScanFrame(frame);
    setTickScanArea(area);
    setActiveTab('ai-tick-check');
  };

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      {/* 1. Top Brand Banner */}
      <section className="bg-black text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b border-zinc-800 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-orange-500/20 text-orange-400 border border-orange-500/30 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Pet Technology</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-white">
                DoggyBhai Smart Care
              </h1>
              <p className="text-base sm:text-lg text-zinc-400 max-w-2xl font-body">
                Keep an eye on your best friend, even when you're away.
              </p>
            </div>

            {/* Quick Dog Profile Summary Card */}
            <div className="flex items-center gap-4 bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-lg font-heading">
                {user?.dogProfile?.name ? user.dogProfile.name.charAt(0) : '🐾'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-white font-heading">
                    {user?.dogProfile?.name || 'Pet Profile'}
                  </span>
                  <span className="text-[11px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded font-medium">
                    {user?.dogProfile?.breed || 'Canine Profile'}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-2">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Monitored
                  </span>
                  <span>•</span>
                  <span>{cameras.length} Active Cameras</span>
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-4 border-t border-zinc-800/80 text-xs sm:text-sm font-bold">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              Overview Dashboard
            </button>

            <button
              onClick={() => setActiveTab('live-cam')}
              className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'live-cam'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Video className="w-4 h-4" />
              Live Pet Cam
            </button>

            <button
              onClick={() => {
                setTickScanFrame(null);
                setActiveTab('ai-tick-check');
              }}
              className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'ai-tick-check'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              AI Tick Check
            </button>

            <button
              onClick={() => setActiveTab('devices')}
              className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'devices'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Camera className="w-4 h-4" />
              My Cameras ({cameras.length})
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <History className="w-4 h-4" />
              Scan History ({scanHistory.length})
            </button>

            <button
              onClick={() => setActiveTab('alerts')}
              className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'alerts'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Bell className="w-4 h-4" />
              Alerts
              {unreadAlertsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse ml-0.5" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* 2. Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* VIEW 1: OVERVIEW DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-10">
            {/* Top 2 Major Feature Cards (Hero Prominence) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Feature 1: LIVE CAM */}
              <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Video className="w-7 h-7" />
                    </div>
                    {activeCamera?.isOnline && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        LIVE STREAM READY
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-extrabold text-black font-heading tracking-tight">
                    LIVE CAM
                  </h3>

                  <p className="text-base text-zinc-600 leading-relaxed font-body">
                    Check in on your dog from anywhere. Stream encrypted 1080p video, speak via 2-way audio, and snap high-resolution coat inspection frames.
                  </p>

                  <div className="pt-2 text-xs text-zinc-500 space-y-1.5">
                    <p className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Active Camera: <strong>{activeCamera?.name || 'Pet Lounge Cam'}</strong>
                    </p>
                    <p className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      End-to-End Encrypted & Account-Locked
                    </p>
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => setActiveTab('live-cam')}
                    className="w-full py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm tracking-wide shadow-lg hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    OPEN LIVE CAM
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Feature 2: AI TICK CHECK */}
              <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Sparkles className="w-7 h-7" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      ASSISTIVE SCREENING
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-black font-heading tracking-tight">
                    AI TICK CHECK
                  </h3>

                  <p className="text-base text-zinc-600 leading-relaxed font-body">
                    Use your camera to scan your dog's coat for possible tick-like spots. Fast, visual screening with body-map guided inspection.
                  </p>

                  <div className="pt-2 text-xs text-zinc-500 space-y-1.5">
                    <p className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Inspect High-Risk Zones (Ears, Neck, Back, Paws)
                    </p>
                    <p className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-zinc-400" />
                      Visual guidance • Non-diagnostic assistive safety tool
                    </p>
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => {
                      setTickScanFrame(null);
                      setActiveTab('ai-tick-check');
                    }}
                    className="w-full py-4 rounded-2xl bg-black hover:bg-zinc-800 text-white font-extrabold text-sm tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    START AI TICK CHECK
                    <ArrowRight className="w-4 h-4 text-orange-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Live Preview Banner & Camera Switcher */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
                <div>
                  <h3 className="text-xl font-extrabold text-black font-heading">
                    Active Pet Stream Overview
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Live connection feed from {activeCamera?.name || 'DoggyBhai Cam'} ({activeCamera?.location})
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPrivacyModalOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-black py-2 px-3 rounded-xl border border-zinc-200 hover:bg-zinc-50"
                  >
                    <Lock className="w-3.5 h-3.5 text-emerald-600" /> Privacy Certificate
                  </button>
                  <button
                    onClick={() => setIsSetupWizardOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-orange-600 hover:text-orange-700 py-2 px-3 rounded-xl bg-orange-50 hover:bg-orange-100"
                  >
                    + Add New Camera
                  </button>
                </div>
              </div>

              {/* Embedded Live Camera Component */}
              <LiveCameraView
                onOpenTickScanWithFrame={handleOpenTickScanWithFrame}
                onOpenSetup={() => setIsSetupWizardOpen(true)}
              />
            </div>

            {/* Recent Scans & Alerts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Recent Scans */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-zinc-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                  <h3 className="text-base font-extrabold text-black font-heading flex items-center gap-2">
                    <History className="w-4 h-4 text-orange-500" />
                    Recent AI Coat Screenings
                  </h3>
                  <button
                    onClick={() => setActiveTab('history')}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700"
                  >
                    View All ({scanHistory.length}) →
                  </button>
                </div>

                {scanHistory.length === 0 ? (
                  <p className="text-xs text-zinc-500 py-6 text-center">
                    No coat screenings performed yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {scanHistory.slice(0, 3).map((scan) => (
                      <div
                        key={scan.id}
                        onClick={() => setActiveTab('history')}
                        className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 hover:bg-orange-50/40 border border-zinc-200 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={scan.imageUrl}
                            alt="Scan"
                            className="w-12 h-12 rounded-xl object-cover border border-zinc-300"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-black">
                                {scan.areaScanned} Area
                              </span>
                              <span
                                className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                                  scan.result.status === 'detected'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {scan.result.status === 'detected' ? 'Possible Spot' : 'Clear'}
                              </span>
                            </div>
                            <p className="text-[11px] text-zinc-500 mt-0.5">
                              {scan.date} • {user?.dogProfile?.name || 'Screening Record'}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-zinc-400" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Smart Alerts */}
              <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-zinc-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                  <h3 className="text-base font-extrabold text-black font-heading flex items-center gap-2">
                    <Bell className="w-4 h-4 text-orange-500" />
                    Smart Care Alerts
                  </h3>
                  {unreadAlertsCount > 0 && (
                    <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                      {unreadAlertsCount} New
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  {smartAlerts.slice(0, 3).map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-3.5 rounded-2xl border text-xs space-y-1 ${
                        alert.severity === 'alert'
                          ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                          : 'bg-zinc-50 border-zinc-200 text-zinc-800'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span className="flex items-center gap-1.5">
                          {alert.severity === 'alert' && (
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                          )}
                          {alert.title}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-normal">
                          {alert.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-zinc-600">
                        {alert.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hardware Product Showcase Section */}
            <SmartCareHardwareSection />
          </div>
        )}

        {/* VIEW 2: LIVE CAM ONLY */}
        {activeTab === 'live-cam' && (
          <LiveCameraView
            onOpenTickScanWithFrame={handleOpenTickScanWithFrame}
            onOpenSetup={() => setIsSetupWizardOpen(true)}
          />
        )}

        {/* VIEW 3: AI TICK CHECK */}
        {activeTab === 'ai-tick-check' && (
          <AiTickCheckView
            initialFrame={tickScanFrame}
            initialArea={tickScanArea}
            onOpenVetModal={() => setIsVetModalOpen(true)}
          />
        )}

        {/* VIEW 4: MY CAMERAS */}
        {activeTab === 'devices' && (
          <CameraDeviceManager
            onOpenSetup={() => setIsSetupWizardOpen(true)}
            onSelectCameraToView={(id) => {
              setActiveTab('live-cam');
            }}
          />
        )}

        {/* VIEW 5: SCAN HISTORY */}
        {activeTab === 'history' && (
          <ScanHistoryView
            onStartNewScan={() => {
              setTickScanFrame(null);
              setActiveTab('ai-tick-check');
            }}
            onOpenVetModal={() => setIsVetModalOpen(true)}
          />
        )}

        {/* VIEW 6: ALERTS */}
        {activeTab === 'alerts' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <div>
                <h2 className="text-xl font-extrabold text-black font-heading">
                  Smart Notifications & Care Logs
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Automated pet motion logs, tick screening alerts, and camera connection updates.
                </p>
              </div>
              <button
                onClick={clearAlerts}
                className="text-xs font-bold text-zinc-500 hover:text-red-600"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-3">
              {smartAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-2xl border flex items-start justify-between gap-4 ${
                    alert.severity === 'alert'
                      ? 'bg-amber-50 border-amber-200'
                      : 'bg-zinc-50 border-zinc-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-black">{alert.title}</span>
                      <span className="text-[10px] bg-white border px-2 py-0.5 rounded font-mono text-zinc-500">
                        {alert.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-700 leading-relaxed max-w-xl">
                      {alert.message}
                    </p>
                  </div>

                  {alert.scanId && (
                    <button
                      onClick={() => setActiveTab('history')}
                      className="px-3.5 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-sm"
                    >
                      View Scan
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Setup Wizard Modal */}
      <CameraSetupWizard
        isOpen={isSetupWizardOpen}
        onClose={() => setIsSetupWizardOpen(false)}
      />

      {/* Privacy Certificate Modal */}
      <SmartCarePrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      {/* Veterinary Tele-Consultation Modal */}
      <VetContactModal
        isOpen={isVetModalOpen}
        onClose={() => setIsVetModalOpen(false)}
      />
    </div>
  );
};
