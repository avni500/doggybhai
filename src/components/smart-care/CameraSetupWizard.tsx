import React, { useState } from 'react';
import {
  Wifi,
  Video,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  MapPin,
  Camera,
  ShieldCheck
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

interface CameraSetupWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_LOCATIONS = [
  'Living Room',
  'Pet Resting Area',
  'Indoor Play Zone',
  'Master Bedroom',
  'Back Garden',
  'Balcony'
];

export const CameraSetupWizard: React.FC<CameraSetupWizardProps> = ({
  isOpen,
  onClose
}) => {
  const { addCamera, user } = useShop();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [cameraCode, setCameraCode] = useState<string>('DB-CAM-8910');
  const [cameraName, setCameraName] = useState<string>(
    user?.dogProfile?.name ? `${user.dogProfile.name}'s Cam` : 'Living Room Cam'
  );
  const [selectedLocation, setSelectedLocation] = useState<string>('Living Room');
  const [isWired, setIsWired] = useState<boolean>(true);
  const [isTestingConnection, setIsTestingConnection] = useState<boolean>(false);
  const [testSuccess, setTestSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleTestConnection = () => {
    setIsTestingConnection(true);
    setTimeout(() => {
      setIsTestingConnection(false);
      setTestSuccess(true);
    }, 1200);
  };

  const handleFinishSetup = () => {
    addCamera({
      name: cameraName.trim() || 'DoggyBhai Smart Cam',
      location: selectedLocation,
      isOnline: true,
      lastActive: 'Just now',
      resolution: '1080p Full HD',
      batteryLevel: isWired ? undefined : 100,
      isWired,
      demoVideoType: 'resting',
      remoteAccessEnabled: true,
      nightVisionMode: 'auto',
      twoWayAudioEnabled: true,
      motionAlertsEnabled: true,
      isDemoStream: true,
      firmwareVersion: 'v2.4.1-doggy-pro',
      ipAddress: '192.168.1.108'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-zinc-200 shadow-2xl animate-scale-up">
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-orange-600">
              Camera Setup • Step {currentStep} of 5
            </span>
            <h3 className="text-xl font-extrabold text-black font-heading mt-0.5">
              {currentStep === 1 && '1. Connect Camera'}
              {currentStep === 2 && '2. Name Your Camera'}
              {currentStep === 3 && '3. Select Room Location'}
              {currentStep === 4 && '4. Test Live Connection'}
              {currentStep === 5 && '5. Finish & Activate'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-black font-bold text-sm p-1"
          >
            ✕
          </button>
        </div>

        {/* Wizard Progress Bar */}
        <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden my-5">
          <div
            className="bg-orange-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>

        {/* Step Contents */}
        <div className="min-h-[220px] flex flex-col justify-center">
          {/* STEP 1: Connect Camera */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-zinc-600">
                Turn on your DoggyBhai Smart Care camera and enter the 8-digit pairing code found on the base label or scan the QR code.
              </p>
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                  Pairing / Device Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cameraCode}
                    onChange={(e) => setCameraCode(e.target.value.toUpperCase())}
                    placeholder="e.g. DB-CAM-8910"
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl font-mono font-bold text-sm text-black focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Found via Wi-Fi
                  </span>
                </div>
              </div>
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-xs text-zinc-500 flex items-center gap-2">
                <Wifi className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Camera broadcasting on 2.4GHz Wi-Fi network</span>
              </div>
            </div>
          )}

          {/* STEP 2: Name Camera */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-zinc-600">
                Give this camera a familiar name so you can identify which room you are checking in on.
              </p>
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                  Camera Name
                </label>
                <input
                  type="text"
                  value={cameraName}
                  onChange={(e) => setCameraName(e.target.value)}
                  placeholder="e.g. Living Room Cam, Play Area, Backyard Cam"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl font-bold text-sm text-black focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold text-zinc-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="power"
                    checked={isWired}
                    onChange={() => setIsWired(true)}
                    className="text-orange-500"
                  />
                  Wired Power Adapter
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="power"
                    checked={!isWired}
                    onChange={() => setIsWired(false)}
                    className="text-orange-500"
                  />
                  Rechargeable Battery
                </label>
              </div>
            </div>
          )}

          {/* STEP 3: Select Location */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-zinc-600">
                Select where this camera is physically positioned in your home:
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {PRESET_LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setSelectedLocation(loc)}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                      selectedLocation === loc
                        ? 'bg-orange-500 text-white border-orange-600 shadow-sm'
                        : 'bg-zinc-50 text-zinc-800 border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 inline mr-1 opacity-80" />
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Test Live Connection */}
          {currentStep === 4 && (
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center mx-auto text-orange-600">
                {testSuccess ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                ) : (
                  <Video className="w-8 h-8 text-orange-500" />
                )}
              </div>

              <div>
                <h4 className="text-base font-extrabold text-black font-heading">
                  {testSuccess ? 'Connection Verified (1080p 30 FPS)' : 'Test Handshake & Video Stream'}
                </h4>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                  {testSuccess
                    ? 'Camera latency: 18ms. Encryption keys exchanged successfully.'
                    : 'Click below to verify video transmission with DoggyBhai Secure Gateway.'}
                </p>
              </div>

              {!testSuccess && (
                <button
                  onClick={handleTestConnection}
                  disabled={isTestingConnection}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 text-white font-extrabold text-xs shadow-md hover:bg-orange-600 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isTestingConnection ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Testing Handshake...
                    </>
                  ) : (
                    'TEST CONNECTION'
                  )}
                </button>
              )}
            </div>
          )}

          {/* STEP 5: Finish & Activate */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                    Camera Protected & Ready
                  </h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Your camera is private and accessible exclusively through your authenticated DoggyBhai account.
                  </p>
                </div>
              </div>

              <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-200 text-xs space-y-1.5">
                <div className="flex justify-between text-zinc-600">
                  <span>Camera Name:</span>
                  <strong className="text-black">{cameraName}</strong>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Location:</span>
                  <strong className="text-black">{selectedLocation}</strong>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Resolution:</span>
                  <strong className="text-black">1080p Full HD</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Navigation */}
        <div className="flex items-center justify-between pt-5 border-t border-zinc-100 mt-6">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep((s) => s - 1)}
              className="inline-flex items-center gap-1 text-xs font-bold text-zinc-600 hover:text-black py-2 px-3 rounded-lg hover:bg-zinc-100 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <button
              onClick={() => {
                if (currentStep === 4 && !testSuccess) {
                  handleTestConnection();
                }
                setCurrentStep((s) => s + 1);
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
            >
              Continue <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinishSetup}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
            >
              ACTIVATE CAMERA
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
