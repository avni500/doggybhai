import React, { useState, useEffect, useRef } from 'react';
import {
  Video,
  VideoOff,
  Maximize2,
  Minimize2,
  Camera,
  Volume2,
  VolumeX,
  Play,
  Square,
  Shield,
  Wifi,
  Sparkles,
  RefreshCw,
  Eye,
  Settings,
  Lock,
  BatteryCharging,
  Zap,
  Info,
  ChevronDown,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { SmartCamera, TickScanArea } from '../../types';

interface LiveCameraViewProps {
  onOpenTickScanWithFrame?: (frameDataUrl: string, area: TickScanArea) => void;
  onOpenSetup?: () => void;
}

export const LiveCameraView: React.FC<LiveCameraViewProps> = ({
  onOpenTickScanWithFrame,
  onOpenSetup
}) => {
  const {
    cameras,
    activeCameraId,
    setActiveCameraId,
    activeCamera,
    toggleCameraOnline,
    addToast,
    user
  } = useShop();

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [streamQuality, setStreamQuality] = useState<'1080p' | '720p'>('1080p');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isWebcamActive, setIsWebcamActive] = useState<boolean>(false);
  const [webcamError, setWebcamError] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [capturedSnapshot, setCapturedSnapshot] = useState<string | null>(null);
  const [selectedScanArea, setSelectedScanArea] = useState<TickScanArea>('BACK');
  const [showScanAreaModal, setShowScanAreaModal] = useState<boolean>(false);

  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const webcamVideoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Live timestamp timer
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }) +
          ' ' +
          now.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          }) +
          ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // WebCam Stream Handler
  const startWebcam = async () => {
    try {
      setWebcamError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      if (webcamVideoRef.current) {
        webcamVideoRef.current.srcObject = stream;
        webcamVideoRef.current.play();
      }
      setIsWebcamActive(true);
      addToast('Connected to local device camera', 'success');
    } catch (err: any) {
      setWebcamError(err.message || 'Camera access denied or unavailable in this window.');
      addToast('Could not access device camera', 'error');
    }
  };

  const stopWebcam = () => {
    if (webcamVideoRef.current && webcamVideoRef.current.srcObject) {
      const stream = webcamVideoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      webcamVideoRef.current.srcObject = null;
    }
    setIsWebcamActive(false);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Capture frame from video/canvas
  const captureCurrentFrame = (): string | null => {
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    if (isWebcamActive && webcamVideoRef.current) {
      ctx.drawImage(webcamVideoRef.current, 0, 0, canvas.width, canvas.height);
    } else {
      // Draw simulated frame from dog illustration/video canvas
      const img = new Image();
      img.crossOrigin = 'anonymous';
      // Sample high resolution room feed image corresponding to active camera
      const sampleUrl =
        activeCamera?.demoVideoType === 'playing'
          ? 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1280&q=80'
          : activeCamera?.demoVideoType === 'sleeping'
          ? 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1280&q=80'
          : 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1280&q=80';

      ctx.fillStyle = '#18181B';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return sampleUrl;
    }

    try {
      return canvas.toDataURL('image/jpeg', 0.92);
    } catch {
      return 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1280&q=80';
    }
  };

  const handleTakeSnapshot = () => {
    setIsCapturing(true);
    const frame = captureCurrentFrame();
    setTimeout(() => {
      setIsCapturing(false);
      if (frame) {
        setCapturedSnapshot(frame);
        addToast('Snapshot saved from live camera!', 'success');
      }
    }, 400);
  };

  const handleStartSmartLiveCheck = () => {
    const frame = captureCurrentFrame() || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1280&q=80';
    if (onOpenTickScanWithFrame) {
      onOpenTickScanWithFrame(frame, selectedScanArea);
    }
    setShowScanAreaModal(false);
  };

  // Video feed background poster/stream for simulation
  const getCameraPoster = () => {
    if (!activeCamera) return '';
    switch (activeCamera.demoVideoType) {
      case 'playing':
        return 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1280&q=80';
      case 'sleeping':
        return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1280&q=80';
      case 'resting':
      default:
        return 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1280&q=80';
    }
  };

  const cameraDisplayName = activeCamera ? activeCamera.name : 'Live Pet Camera';

  return (
    <div className="space-y-6">
      {/* 1. Camera Top Bar & Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-black font-heading tracking-tight">
                {activeCamera ? activeCamera.name : (user?.dogProfile?.name ? `${user.dogProfile.name}'s Camera` : 'Live Pet Camera')}
              </h2>
              {activeCamera?.isOnline ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-zinc-100 text-zinc-600 border border-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-zinc-400" />
                  OFFLINE
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-500 mt-0.5 flex items-center gap-2">
              <span>{activeCamera?.location || 'Living Room'}</span>
              <span>•</span>
              <span className="text-emerald-700 font-medium">1080p HD (30 FPS)</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-zinc-500">
                <Shield className="w-3 h-3 text-emerald-600" /> Encrypted Stream
              </span>
            </p>
          </div>
        </div>

        {/* Camera Switcher Dropdown & Live Webcam Toggle */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <select
              value={activeCameraId}
              onChange={(e) => {
                setActiveCameraId(e.target.value);
                if (isWebcamActive) stopWebcam();
              }}
              className="appearance-none bg-zinc-50 border border-zinc-300 hover:border-zinc-400 text-zinc-900 text-sm font-semibold rounded-xl pl-3.5 pr-9 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors cursor-pointer"
            >
              {cameras.map((cam) => (
                <option key={cam.id} value={cam.id}>
                  {cam.name} ({cam.isOnline ? 'Online' : 'Offline'})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={() => {
              if (isWebcamActive) {
                stopWebcam();
              } else {
                startWebcam();
              }
            }}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
              isWebcamActive
                ? 'bg-orange-500 text-white border-orange-600 shadow-sm'
                : 'bg-white text-zinc-800 border-zinc-300 hover:bg-zinc-50'
            }`}
            title="Toggle your computer/phone webcam to test with a real camera"
          >
            <Camera className="w-4 h-4" />
            {isWebcamActive ? 'Using Real Webcam' : 'Use Device Camera'}
          </button>

          {activeCamera && (
            <button
              onClick={() => toggleCameraOnline(activeCamera.id)}
              className="p-2.5 text-zinc-600 hover:text-zinc-900 rounded-xl hover:bg-zinc-100 border border-zinc-200 transition-colors cursor-pointer"
              title={activeCamera.isOnline ? 'Simulate Camera Offline' : 'Reconnect Camera'}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Main Live Video Window Viewport */}
      <div
        ref={videoContainerRef}
        className="relative w-full aspect-video bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-xl flex items-center justify-center group select-none"
      >
        {activeCamera && activeCamera.isOnline ? (
          <>
            {/* Live Stream Media: Either Local Webcam or Simulated High-Def Feed */}
            {isWebcamActive ? (
              <video
                ref={webcamVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : isPlaying ? (
              <div className="relative w-full h-full">
                <img
                  src={getCameraPoster()}
                  alt="Live Dog Cam Stream"
                  className="w-full h-full object-cover filter contrast-[1.03] brightness-[0.98] transition-all"
                />

                {/* Subtle animated live feed simulation wave/overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

                {/* Live stream status & dog detection badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="bg-black/75 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                    <span className="font-bold tracking-wider text-red-400 uppercase text-[11px]">
                      LIVE
                    </span>
                    <span className="text-zinc-300">|</span>
                    <span>{activeCamera.name}</span>
                  </div>

                  <div className="hidden sm:flex items-center gap-1.5 bg-black/75 backdrop-blur-md text-zinc-200 text-xs px-2.5 py-1.5 rounded-lg border border-white/10">
                    <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Signal: Strong (98%)</span>
                  </div>

                  {activeCamera.isDemoStream && !isWebcamActive && (
                    <div className="bg-orange-500/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded tracking-wider uppercase">
                      DEMO STREAM
                    </div>
                  )}
                </div>

                {/* Live timestamp overlay */}
                <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md text-zinc-300 font-mono text-xs px-3 py-1.5 rounded-lg border border-white/10 tracking-wide">
                  {currentTime}
                </div>

                {/* Pet Activity Motion Indicator (Smart Detection simulation) */}
                <div className="absolute bottom-20 left-4 bg-black/75 backdrop-blur-md text-white text-xs px-3 py-2 rounded-xl border border-white/10 flex items-center gap-2.5 max-w-xs animate-fade-in">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-[11px] leading-tight text-zinc-200">
                    <strong className="text-white font-bold">{user?.dogProfile?.name || 'Pet Status'}:</strong> Resting comfortably in {activeCamera.location}.
                  </p>
                </div>

                {/* Big Center Quick Action: SMART LIVE CHECK */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto flex items-center gap-3">
                  <button
                    onClick={() => setShowScanAreaModal(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm shadow-2xl hover:scale-105 transition-all border border-orange-400 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 animate-spin-slow" />
                    SMART LIVE CHECK (SCAN FRAME)
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-6 text-zinc-400">
                <VideoOff className="w-12 h-12 text-zinc-600 mb-3" />
                <p className="text-base font-semibold text-zinc-200">Stream Paused</p>
                <p className="text-xs text-zinc-500 mt-1">Press play below to resume live video</p>
                <button
                  onClick={() => setIsPlaying(true)}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-xl font-bold text-xs hover:bg-orange-600 transition-colors"
                >
                  <Play className="w-4 h-4 fill-current" /> Resume Stream
                </button>
              </div>
            )}

            {/* Bottom Stream Control Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 flex items-center justify-between text-white transition-opacity">
              {/* Left: Play/Pause, Mute/Unmute, Snapshot */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 bg-white/15 hover:bg-white/25 rounded-lg transition-colors cursor-pointer text-white"
                  title={isPlaying ? 'Pause Viewing' : 'Start Viewing'}
                >
                  {isPlaying ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 bg-white/15 hover:bg-white/25 rounded-lg transition-colors cursor-pointer text-white"
                  title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={handleTakeSnapshot}
                  disabled={isCapturing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-lg transition-colors text-xs font-bold cursor-pointer text-white disabled:opacity-50"
                  title="Take high-resolution camera snapshot"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{isCapturing ? 'Snapping...' : 'Snapshot'}</span>
                </button>

                <button
                  onClick={() => setShowScanAreaModal(true)}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors text-xs font-bold cursor-pointer text-white shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Scan Frame</span>
                </button>
              </div>

              {/* Right: Quality, Fullscreen, Security */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1 bg-white/10 rounded-lg p-0.5 text-[11px] font-bold">
                  <button
                    onClick={() => setStreamQuality('1080p')}
                    className={`px-2 py-1 rounded ${
                      streamQuality === '1080p' ? 'bg-orange-500 text-white' : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    1080p HD
                  </button>
                  <button
                    onClick={() => setStreamQuality('720p')}
                    className={`px-2 py-1 rounded ${
                      streamQuality === '720p' ? 'bg-orange-500 text-white' : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    720p
                  </button>
                </div>

                <button
                  onClick={toggleFullscreen}
                  className="p-2 bg-white/15 hover:bg-white/25 rounded-lg transition-colors cursor-pointer text-white"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen View'}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Camera Offline State */
          <div className="flex flex-col items-center justify-center text-center p-8 max-w-md">
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-4">
              <VideoOff className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-xl font-extrabold text-white font-heading">
              Camera Offline
            </h3>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              Your DoggyBhai camera is currently unavailable. Please check your camera's Wi-Fi connection or power adapter.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {activeCamera && (
                <button
                  onClick={() => toggleCameraOnline(activeCamera.id)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-extrabold rounded-xl transition-all shadow-md cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" /> TRY AGAIN
                </button>
              )}
              {onOpenSetup && (
                <button
                  onClick={onOpenSetup}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-xl border border-zinc-700 transition-colors cursor-pointer"
                >
                  <Settings className="w-4 h-4" /> Reconfigure Camera
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Snapshot Preview Card if captured */}
      {capturedSnapshot && (
        <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <img
              src={capturedSnapshot}
              alt="Snapshot preview"
              className="w-20 h-14 rounded-xl object-cover border border-zinc-200 shadow-sm"
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-orange-600">
                Camera Frame Saved
              </p>
              <h4 className="text-sm font-bold text-black font-heading">
                Ready for AI Coat Visual Screening
              </h4>
              <p className="text-xs text-zinc-500">
                Captured from {activeCamera?.name || 'Live Camera'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                if (onOpenTickScanWithFrame) {
                  onOpenTickScanWithFrame(capturedSnapshot, 'BACK');
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Check Coat with AI
            </button>
            <button
              onClick={() => setCapturedSnapshot(null)}
              className="px-3 py-2 text-zinc-600 hover:text-zinc-900 text-xs font-medium rounded-xl hover:bg-zinc-100 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* 3. Camera Quick Specs & Privacy Note */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-black uppercase tracking-wider">Privacy & Security</h4>
            <p className="text-xs text-zinc-500 mt-0.5">
              Your camera is private and accessible only through your authenticated DoggyBhai account.
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-black uppercase tracking-wider">Hardware Status</h4>
            <p className="text-xs text-zinc-500 mt-0.5">
              {activeCamera?.isWired ? 'Constant Wall Power' : `Battery: ${activeCamera?.batteryLevel || 94}%`} • Firmware {activeCamera?.firmwareVersion || 'v2.4'}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-black uppercase tracking-wider">AI Screen Ready</h4>
            <p className="text-xs text-zinc-500 mt-0.5">
              Scan live frames instantly to visually detect possible tick spots on your dog's coat.
            </p>
          </div>
        </div>
      </div>

      {/* Scan Frame Area Selection Modal */}
      {showScanAreaModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-zinc-200 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2 text-orange-600 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Smart Live Check</span>
              </div>
              <button
                onClick={() => setShowScanAreaModal(false)}
                className="text-zinc-400 hover:text-black font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-extrabold text-black font-heading">
                Select Coat Area to Screen
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                Choose the visible body zone in the current camera frame for targeted AI coat screening.
              </p>

              <div className="grid grid-cols-3 gap-2 mt-4">
                {(
                  [
                    'BACK',
                    'NECK',
                    'EARS',
                    'HEAD',
                    'CHEST',
                    'BELLY',
                    'LEGS',
                    'PAWS',
                    'TAIL'
                  ] as TickScanArea[]
                ).map((area) => (
                  <button
                    key={area}
                    onClick={() => setSelectedScanArea(area)}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                      selectedScanArea === area
                        ? 'bg-orange-500 text-white border-orange-600 shadow-sm'
                        : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>

              <div className="mt-5 p-3 rounded-xl bg-orange-50/60 border border-orange-200 text-orange-950 text-xs leading-relaxed">
                <strong>Assistive Screening:</strong> DoggyBhai AI will analyze high-contrast clusters and visible dark spots on the captured frame.
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowScanAreaModal(false)}
                  className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStartSmartLiveCheck}
                  className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs shadow-md transition-colors cursor-pointer"
                >
                  CAPTURE & SCREEN NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
