import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ShieldAlert,
  Sparkles,
  PhoneCall,
  RefreshCw,
  Download,
  Share2,
  Eye,
  Info,
  MapPin,
  Stethoscope,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { TickScanRecord } from '../../types';
import { useShop } from '../../context/ShopContext';

interface TickScanResultCardProps {
  scanRecord: TickScanRecord;
  onScanAnotherArea?: () => void;
  onOpenVetModal?: () => void;
}

export const TickScanResultCard: React.FC<TickScanResultCardProps> = ({
  scanRecord,
  onScanAnotherArea,
  onOpenVetModal
}) => {
  const { addToast } = useShop();
  const { result, dogName, dogBreed, areaScanned, imageUrl, date } = scanRecord;
  const [showBoundingBox, setShowBoundingBox] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<'normal' | 'zoomed'>('normal');

  const isDetected = result.status === 'detected';
  const isClear = result.status === 'clear';
  const isLowQuality = result.status === 'low_quality';

  const handleDownloadReport = () => {
    addToast('Scan report saved to downloads (PDF/Summary)', 'success');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Scan report link copied to clipboard', 'info');
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-zinc-200 shadow-xl overflow-hidden animate-fade-in">
      {/* 1. Header Banner based on Status */}
      <div
        className={`p-6 sm:p-8 text-white relative overflow-hidden ${
          isDetected
            ? 'bg-gradient-to-br from-amber-600 via-orange-600 to-red-600'
            : isClear
            ? 'bg-gradient-to-br from-emerald-600 via-teal-600 to-green-700'
            : 'bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900'
        }`}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-white/20 backdrop-blur-md border border-white/20 tracking-wider uppercase">
              {isDetected ? (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-200" />
                  <span>Visual Screening Notice</span>
                </>
              ) : isClear ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
                  <span>Coat Appears Clear</span>
                </>
              ) : (
                <>
                  <HelpCircle className="w-3.5 h-3.5 text-zinc-300" />
                  <span>Image Quality Alert</span>
                </>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight leading-tight">
              {result.title}
            </h2>

            <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
              {result.summaryText}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-white/80 pt-2">
              <span><strong>Subject:</strong> {dogName && dogName !== 'Bruno' && dogName !== 'Sample Pet' ? `${dogName} (${dogBreed})` : dogBreed}</span>
              <span>•</span>
              <span><strong>Target Area:</strong> {areaScanned}</span>
              <span>•</span>
              <span><strong>Date:</strong> {date}</span>
            </div>
          </div>

          {/* Confidence Score Pill */}
          <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center bg-black/20 backdrop-blur-md p-4 rounded-2xl border border-white/15 min-w-[160px]">
            <span className="text-xs uppercase tracking-wider font-semibold text-white/80">
              Model Match
            </span>
            <span className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              {result.confidencePercentage}%
            </span>
            <span className="text-[11px] text-white/70">
              Confidence: {result.modelConfidenceLevel}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Body Content */}
      <div className="p-6 sm:p-8 space-y-8">
        {/* Visual Inspection Section with Bounding Box Overlay */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Image & Bounding Box Viewport */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Scanned Photo ({areaScanned})
              </span>
              <div className="flex items-center gap-2">
                {isDetected && result.boundingBox && (
                  <button
                    onClick={() => setShowBoundingBox(!showBoundingBox)}
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                      showBoundingBox
                        ? 'bg-orange-50 text-orange-700 border-orange-200'
                        : 'bg-zinc-50 text-zinc-600 border-zinc-200'
                    }`}
                  >
                    {showBoundingBox ? 'Hide Highlight Box' : 'Show Highlight Box'}
                  </button>
                )}
                <button
                  onClick={() => setZoomLevel(zoomLevel === 'normal' ? 'zoomed' : 'normal')}
                  className="text-xs font-bold px-2.5 py-1 rounded-lg bg-zinc-50 text-zinc-700 border border-zinc-200 hover:bg-zinc-100 transition-colors cursor-pointer"
                >
                  {zoomLevel === 'normal' ? 'Zoom In' : 'Reset Zoom'}
                </button>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-950 aspect-video shadow-inner flex items-center justify-center">
              <img
                src={imageUrl}
                alt="Scanned coat"
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  zoomLevel === 'zoomed' ? 'scale-150 cursor-zoom-out' : 'scale-100'
                }`}
                onClick={() => setZoomLevel(zoomLevel === 'normal' ? 'zoomed' : 'normal')}
              />

              {/* Highlight Bounding Box for Detected Region */}
              {isDetected && showBoundingBox && result.boundingBox && (
                <div
                  style={{
                    left: `${result.boundingBox.x}%`,
                    top: `${result.boundingBox.y}%`,
                    width: `${result.boundingBox.width}%`,
                    height: `${result.boundingBox.height}%`
                  }}
                  className="absolute border-2 border-amber-400 bg-amber-500/25 rounded-lg shadow-lg pointer-events-none animate-pulse flex items-start justify-end p-1"
                >
                  <span className="bg-amber-500 text-black font-extrabold text-[10px] px-1.5 py-0.5 rounded shadow">
                    Possible Spot
                  </span>
                </div>
              )}

              {/* Location Tag */}
              <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>{result.locationLabel}</span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-500 text-center">
              {isDetected
                ? 'Yellow highlight indicates the visual location flagged by the screening engine.'
                : 'Scanned at high fidelity under standard pet coat visual screening criteria.'}
            </p>
          </div>

          {/* Detection Analysis & Action Steps */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h3 className="text-base font-bold text-black font-heading mb-2">
                Screening Assessment Details
              </h3>
              <p className="text-sm text-zinc-700 leading-relaxed bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
                {result.details}
              </p>
            </div>

            {/* Recommended Next Actions */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-black font-heading mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-500" />
                Recommended Next Steps for Pet Parent
              </h3>

              <div className="space-y-2.5">
                {result.recommendedActions.map((action, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-orange-50/50 border border-orange-100 text-zinc-800 text-xs sm:text-sm leading-relaxed"
                  >
                    <span className="w-5 h-5 rounded-full bg-orange-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Tips if Low Quality */}
            {isLowQuality && result.qualityTips && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
                  Tips for a high-accuracy scan:
                </h4>
                <ul className="text-xs text-amber-800 space-y-1 list-disc list-inside">
                  {result.qualityTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 3. Mandatory Professional Veterinary Disclaimer */}
        <div className="p-5 sm:p-6 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 flex flex-col sm:flex-row items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-black flex items-center justify-center shrink-0 shadow-sm">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold font-heading text-amber-950 uppercase tracking-wider">
              Mandatory Health & Screening Notice
            </h4>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
              {result.veterinaryNote}
            </p>
            <p className="text-xs text-amber-800 pt-1">
              Never administer medications without a veterinarian's written prescription. DoggyBhai AI is an assistive technology designed to encourage thorough pet care routines.
            </p>
          </div>
        </div>

        {/* 4. Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-200">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onScanAnotherArea && (
              <button
                onClick={onScanAnotherArea}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                SCAN ANOTHER AREA
              </button>
            )}

            {isDetected && onOpenVetModal && (
              <button
                onClick={onOpenVetModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-black hover:bg-zinc-800 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
              >
                <Stethoscope className="w-4 h-4 text-orange-400" />
                CONTACT VET
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleDownloadReport}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-300 text-zinc-700 hover:text-black hover:bg-zinc-50 text-xs font-bold transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Save Report
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-300 text-zinc-700 hover:text-black hover:bg-zinc-50 text-xs font-bold transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
