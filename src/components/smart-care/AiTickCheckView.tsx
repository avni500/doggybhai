import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Camera,
  Upload,
  Video,
  ShieldAlert,
  Info,
  CheckCircle2,
  RefreshCw,
  HelpCircle,
  Dog,
  Eye,
  Zap,
  ArrowRight,
  Layers
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { TickScanArea, TickScanRecord } from '../../types';
import { TickScanResultCard } from './TickScanResultCard';

interface AiTickCheckViewProps {
  initialFrame?: string | null;
  initialArea?: TickScanArea;
  onOpenVetModal?: () => void;
}

const SCAN_AREAS: { area: TickScanArea; label: string; risk: 'High' | 'Medium' | 'Low'; hint: string }[] = [
  { area: 'EARS', label: 'Ears & Flaps', risk: 'High', hint: 'Inside ear folds & base of skull' },
  { area: 'NECK', label: 'Neck & Scruff', risk: 'High', hint: 'Under collar and deep skin creases' },
  { area: 'PAWS', label: 'Paws & Toes', risk: 'High', hint: 'Between paw pads and webbed skin' },
  { area: 'BACK', label: 'Back & Spine', risk: 'Medium', hint: 'Along dorsal line down to tail base' },
  { area: 'CHEST', label: 'Chest & Throat', risk: 'Medium', hint: 'Dense chest hair and armpits' },
  { area: 'BELLY', label: 'Belly & Groin', risk: 'High', hint: 'Warm lower abdomen and inner thighs' },
  { area: 'HEAD', label: 'Head & Muzzle', risk: 'Medium', hint: 'Around eyes, eyebrows, and snout' },
  { area: 'LEGS', label: 'Legs & Joints', risk: 'Low', hint: 'Elbows, hocks, and outer limbs' },
  { area: 'TAIL', label: 'Tail & Base', risk: 'Low', hint: 'Underside of tail and rump' }
];

export const AiTickCheckView: React.FC<AiTickCheckViewProps> = ({
  initialFrame,
  initialArea = 'BACK',
  onOpenVetModal
}) => {
  const {
    user,
    activeCamera,
    performTickScan,
    isScanning,
    activeScanRecord,
    setActiveScanRecord,
    addToast
  } = useShop();

  const [selectedArea, setSelectedArea] = useState<TickScanArea>(initialArea);
  const [inputMode, setInputMode] = useState<'upload' | 'camera' | 'device_webcam'>(
    initialFrame ? 'camera' : 'upload'
  );
  const [previewImage, setPreviewImage] = useState<string | null>(initialFrame || null);
  const [currentScanStep, setCurrentScanStep] = useState<number>(0);
  const [isWebcamOpen, setIsWebcamOpen] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamVideoRef = useRef<HTMLVideoElement>(null);

  const dogName = user?.dogProfile?.name || 'Pet Coat';
  const dogBreed = user?.dogProfile?.breed || 'Canine Profile';
  const dogAge = user?.dogProfile?.ageYears ? `${user?.dogProfile?.ageYears} Years` : '2 Years';

  // Preset Sample Photos for Instant Testing
  const SAMPLE_PHOTOS = [
    {
      title: 'Sample: Spot Detection Test (Back)',
      description: 'Macro coat texture with contrast nodule',
      url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
      area: 'BACK' as TickScanArea,
      forceOutcome: 'detected' as const
    },
    {
      title: 'Sample: Clean Coat Baseline (Neck)',
      description: 'Even coat texture without foreign objects',
      url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1000&q=80',
      area: 'NECK' as TickScanArea,
      forceOutcome: 'clear' as const
    },
    {
      title: 'Sample: Low-Light Motion Blur',
      description: 'Dim or blurred frame to test quality check',
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      area: 'EARS' as TickScanArea,
      forceOutcome: 'low_quality' as const
    }
  ];

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewImage(event.target.result as string);
          setActiveScanRecord(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Start Device Camera
  const startDeviceWebcam = async () => {
    try {
      setIsWebcamOpen(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      if (webcamVideoRef.current) {
        webcamVideoRef.current.srcObject = stream;
        webcamVideoRef.current.play();
      }
    } catch {
      setIsWebcamOpen(false);
      addToast('Device camera not accessible. Please upload a photo instead.', 'error');
    }
  };

  // Capture from Webcam
  const captureWebcamPhoto = () => {
    if (webcamVideoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = webcamVideoRef.current.videoWidth || 1280;
      canvas.height = webcamVideoRef.current.videoHeight || 720;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(webcamVideoRef.current, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        setPreviewImage(dataUrl);
        setActiveScanRecord(null);

        // Stop stream
        const stream = webcamVideoRef.current.srcObject as MediaStream;
        stream?.getTracks().forEach((track) => track.stop());
        setIsWebcamOpen(false);
      }
    }
  };

  // Perform AI Tick Scan Execution
  const runAiScreening = async (forceOutcome?: 'detected' | 'clear' | 'low_quality') => {
    if (!previewImage) {
      addToast('Please upload or capture a photo first', 'warning');
      return;
    }

    // Step-by-step progress animation
    setCurrentScanStep(1);
    setTimeout(() => setCurrentScanStep(2), 700);
    setTimeout(() => setCurrentScanStep(3), 1500);

    try {
      const record = await performTickScan(
        previewImage,
        selectedArea,
        dogName,
        inputMode === 'camera' ? 'live_camera' : inputMode === 'device_webcam' ? 'device_camera' : 'photo_upload',
        forceOutcome
      );
      setCurrentScanStep(0);
      addToast('AI coat screening completed', 'success');
    } catch (err: any) {
      setCurrentScanStep(0);
      addToast(err.message || 'Scanning failed', 'error');
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Header & Personalized Dog Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shrink-0">
            <Dog className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-black font-heading tracking-tight">
                {user?.dogProfile?.name ? `Scanning ${user.dogProfile.name}` : 'Coat Visual Screening'}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
                {user?.dogProfile?.breed || 'Pet Profile'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Target Area: <strong className="text-black font-semibold">{selectedArea}</strong> • Assistive visual coat screening tool
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-zinc-50 p-3 rounded-2xl border border-zinc-200 text-xs text-zinc-600 max-w-xs">
            <p className="font-semibold text-black flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-orange-500" />
              Not a Veterinary Diagnosis
            </p>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              Visual screening to help you inspect high-risk areas.
            </p>
          </div>
        </div>
      </div>

      {/* 2. If Active Scan Record exists, show result card with option to scan again */}
      {activeScanRecord ? (
        <div className="space-y-6">
          <TickScanResultCard
            scanRecord={activeScanRecord}
            onScanAnotherArea={() => {
              setActiveScanRecord(null);
              setPreviewImage(null);
            }}
            onOpenVetModal={onOpenVetModal}
          />
        </div>
      ) : (
        /* 3. Scan Workspace: Area Selector + Image Source + Screening Trigger */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Recommended Scan Areas (Dog Body Map) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm space-y-5">
            <div>
              <h3 className="text-base font-extrabold text-black font-heading flex items-center justify-between">
                <span>1. Choose Body Area to Check</span>
                <span className="text-xs text-orange-600 font-bold uppercase tracking-wider">
                  Target: {selectedArea}
                </span>
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                Ticks often gravitate towards dark, warm, skin folds and scruff.
              </p>
            </div>

            {/* Areas Grid */}
            <div className="grid grid-cols-1 gap-2.5">
              {SCAN_AREAS.map((item) => {
                const isSelected = selectedArea === item.area;
                return (
                  <button
                    key={item.area}
                    onClick={() => setSelectedArea(item.area)}
                    className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-orange-500 text-white border-orange-600 shadow-md scale-[1.01]'
                        : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-800 border-zinc-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm font-heading">
                          {item.label}
                        </span>
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : item.risk === 'High'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : 'bg-zinc-200 text-zinc-700'
                          }`}
                        >
                          {item.risk} Risk
                        </span>
                      </div>
                      <p
                        className={`text-[11px] mt-0.5 ${
                          isSelected ? 'text-white/80' : 'text-zinc-500'
                        }`}
                      >
                        {item.hint}
                      </p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                        isSelected ? 'bg-white text-orange-600' : 'bg-zinc-200 text-zinc-600'
                      }`}
                    >
                      {isSelected ? '✓' : '→'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Image Input & Scanning Trigger */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-zinc-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100">
                <h3 className="text-base font-extrabold text-black font-heading">
                  2. Provide Dog Photo for {selectedArea}
                </h3>

                {/* Input Method Switcher */}
                <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl text-xs font-bold">
                  <button
                    onClick={() => {
                      setInputMode('upload');
                      setIsWebcamOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      inputMode === 'upload' ? 'bg-white text-black shadow-sm' : 'text-zinc-600'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5 inline mr-1" /> Upload
                  </button>
                  <button
                    onClick={() => {
                      setInputMode('camera');
                      setIsWebcamOpen(false);
                      setPreviewImage(
                        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80'
                      );
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      inputMode === 'camera' ? 'bg-white text-black shadow-sm' : 'text-zinc-600'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5 inline mr-1" /> Live Cam
                  </button>
                  <button
                    onClick={() => {
                      setInputMode('device_webcam');
                      startDeviceWebcam();
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      inputMode === 'device_webcam' ? 'bg-white text-black shadow-sm' : 'text-zinc-600'
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5 inline mr-1" /> Webcam
                  </button>
                </div>
              </div>

              {/* Viewport: Upload Drag & Drop, Webcam, or Live Stream Frame */}
              {isScanning ? (
                /* Animated Scanning Radar / Laser Beam */
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-950 border border-orange-500 shadow-2xl flex flex-col items-center justify-center p-6 text-white text-center">
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Analyzing"
                      className="absolute inset-0 w-full h-full object-cover opacity-30 filter grayscale"
                    />
                  )}
                  {/* Pulsating Sweeping Laser Line */}
                  <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent shadow-[0_0_15px_#f97316] animate-scan-bounce" />

                  <div className="relative z-10 space-y-4 max-w-sm">
                    <div className="w-16 h-16 rounded-full bg-orange-500/20 border border-orange-400/50 flex items-center justify-center mx-auto text-orange-400 animate-spin-slow">
                      <Sparkles className="w-8 h-8" />
                    </div>

                    <h4 className="text-lg font-bold font-heading text-white">
                      Scanning {selectedArea} Coat Pattern...
                    </h4>

                    <div className="space-y-1 text-xs text-zinc-300">
                      <p className={currentScanStep >= 1 ? 'text-orange-400 font-bold' : ''}>
                        ● Step 1: Normalizing lighting & fur contrast
                      </p>
                      <p className={currentScanStep >= 2 ? 'text-orange-400 font-bold' : ''}>
                        ● Step 2: Isolating visual ectoparasite contours
                      </p>
                      <p className={currentScanStep >= 3 ? 'text-orange-400 font-bold' : ''}>
                        ● Step 3: Compiling assistive safety assessment
                      </p>
                    </div>
                  </div>
                </div>
              ) : isWebcamOpen ? (
                /* Active Device Webcam capture viewport */
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center">
                  <video
                    ref={webcamVideoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-3">
                    <button
                      onClick={captureWebcamPhoto}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs shadow-lg cursor-pointer"
                    >
                      <Camera className="w-4 h-4" /> SNAP PHOTO NOW
                    </button>
                    <button
                      onClick={() => setIsWebcamOpen(false)}
                      className="px-4 py-2 rounded-full bg-black/70 text-white text-xs font-bold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : previewImage ? (
                /* Selected Preview Image */
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-300 shadow-inner group">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <span className="bg-black/75 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-lg">
                      Area: {selectedArea}
                    </span>
                    <button
                      onClick={() => setPreviewImage(null)}
                      className="bg-black/75 hover:bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                    >
                      Change
                    </button>
                  </div>
                </div>
              ) : (
                /* Drag & Drop Upload Zone */
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-video rounded-2xl border-2 border-dashed border-zinc-300 hover:border-orange-500 bg-zinc-50 hover:bg-orange-50/30 flex flex-col items-center justify-center p-6 text-center transition-all cursor-pointer group"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-zinc-200 flex items-center justify-center text-zinc-500 group-hover:text-orange-500 group-hover:border-orange-200 transition-colors mb-3">
                    <Upload className="w-7 h-7" />
                  </div>
                  <h4 className="text-sm font-bold text-black font-heading">
                    Click to upload a clear photo of the {selectedArea.toLowerCase()} coat area
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 max-w-sm">
                    Supports JPG, PNG, WEBP. For optimal visual screening, ensure bright lighting and part fur gently with fingers.
                  </p>
                </div>
              )}

              {/* Instant Test Sample Photos */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Or Test with Sample Photos (Instant Demo):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {SAMPLE_PHOTOS.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setPreviewImage(sample.url);
                        setSelectedArea(sample.area);
                        setActiveScanRecord(null);
                      }}
                      className="p-3 rounded-2xl border border-zinc-200 hover:border-orange-400 bg-zinc-50 hover:bg-orange-50/40 text-left transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <p className="text-xs font-bold text-black font-heading leading-tight">
                          {sample.title}
                        </p>
                        <p className="text-[11px] text-zinc-500 mt-0.5 line-clamp-1">
                          {sample.description}
                        </p>
                      </div>
                      <span className="text-[10px] text-orange-600 font-extrabold mt-2 uppercase tracking-wide">
                        Load Frame →
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Screening Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => runAiScreening()}
                  disabled={!previewImage || isScanning}
                  className="w-full py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-base tracking-wide shadow-xl hover:shadow-orange-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5" />
                  START AI TICK CHECK ({selectedArea})
                </button>
                <p className="text-[11px] text-zinc-500 text-center mt-2">
                  Assistive AI visual analysis only • Not a veterinary diagnosis
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
