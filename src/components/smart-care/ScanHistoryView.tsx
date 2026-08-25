import React, { useState } from 'react';
import {
  History,
  Trash2,
  Filter,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Eye,
  Download,
  Calendar,
  Sparkles,
  RefreshCw,
  Dog
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { TickScanRecord, TickScanArea } from '../../types';
import { TickScanResultCard } from './TickScanResultCard';

interface ScanHistoryViewProps {
  onStartNewScan?: () => void;
  onOpenVetModal?: () => void;
}

export const ScanHistoryView: React.FC<ScanHistoryViewProps> = ({
  onStartNewScan,
  onOpenVetModal
}) => {
  const {
    scanHistory,
    deleteScanRecord,
    clearScanHistory,
    setActiveScanRecord,
    addToast,
    user
  } = useShop();

  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [selectedAreaFilter, setSelectedAreaFilter] = useState<string>('all');
  const [inspectingRecord, setInspectingRecord] = useState<TickScanRecord | null>(null);

  const filteredScans = scanHistory.filter((scan) => {
    if (selectedStatusFilter !== 'all' && scan.result.status !== selectedStatusFilter) {
      return false;
    }
    if (selectedAreaFilter !== 'all' && scan.areaScanned !== selectedAreaFilter) {
      return false;
    }
    return true;
  });

  const handleExportHistory = () => {
    addToast('Scan history summary exported successfully (PDF)', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-black font-heading tracking-tight">
            AI Coat Screening History ({scanHistory.length})
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Review past visual tick screenings for {user?.dogProfile?.name || 'your dog'}, track high-risk areas, and export reports for your vet.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {scanHistory.length > 0 && (
            <>
              <button
                onClick={handleExportHistory}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-300 text-zinc-700 hover:text-black hover:bg-zinc-50 text-xs font-bold transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Export PDF
              </button>
              <button
                onClick={clearScanHistory}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors cursor-pointer"
                title="Clear all records"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            </>
          )}
          {onStartNewScan && (
            <button
              onClick={onStartNewScan}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> NEW SCAN
            </button>
          )}
        </div>
      </div>

      {/* Filters Bar */}
      {scanHistory.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm text-xs">
          <span className="font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5" /> Filter By:
          </span>

          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl font-bold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          >
            <option value="all">All Screening Outcomes</option>
            <option value="detected">Possible Spot Detected</option>
            <option value="clear">Coat Clear</option>
            <option value="low_quality">Unclear Image</option>
          </select>

          <select
            value={selectedAreaFilter}
            onChange={(e) => setSelectedAreaFilter(e.target.value)}
            className="px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-xl font-bold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          >
            <option value="all">All Coat Areas</option>
            <option value="EARS">Ears</option>
            <option value="NECK">Neck</option>
            <option value="BACK">Back</option>
            <option value="CHEST">Chest</option>
            <option value="BELLY">Belly</option>
            <option value="PAWS">Paws</option>
          </select>
        </div>
      )}

      {/* Records List */}
      {filteredScans.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-zinc-200 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center mx-auto text-orange-500">
            <History className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-extrabold text-black font-heading">
            No Scan Records Found
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto">
            {scanHistory.length === 0
              ? 'You have not performed any AI tick screenings yet. Use your live camera or upload a photo to screen your dog.'
              : 'No scans match your selected filter criteria.'}
          </p>
          {onStartNewScan && (
            <button
              onClick={onStartNewScan}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> START FIRST SCAN
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScans.map((scan) => {
            const isDetected = scan.result.status === 'detected';
            const isClear = scan.result.status === 'clear';

            return (
              <div
                key={scan.id}
                className="bg-white rounded-3xl border border-zinc-200 hover:border-zinc-300 shadow-sm overflow-hidden flex flex-col justify-between transition-all"
              >
                <div>
                  {/* Card Image Thumbnail */}
                  <div className="relative aspect-video bg-zinc-950 overflow-hidden">
                    <img
                      src={scan.imageUrl}
                      alt={scan.areaScanned}
                      className="w-full h-full object-cover"
                    />

                    {/* Status Pill */}
                    <div className="absolute top-3 left-3">
                      {isDetected ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-amber-500 text-black shadow-md">
                          <AlertTriangle className="w-3 h-3" />
                          POSSIBLE SPOT
                        </span>
                      ) : isClear ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-emerald-600 text-white shadow-md">
                          <CheckCircle2 className="w-3 h-3" />
                          COAT CLEAR
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-zinc-800 text-white">
                          <HelpCircle className="w-3 h-3" />
                          UNCLEAR
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded">
                      {scan.result.confidencePercentage}% Match
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                        {scan.date}
                      </span>
                      <span className="font-bold text-orange-600 uppercase">
                        Area: {scan.areaScanned}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-sm text-black font-heading line-clamp-1">
                      {scan.result.title}
                    </h4>

                    <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                      {scan.result.summaryText}
                    </p>

                    <div className="text-[11px] text-zinc-500 pt-1 border-t border-zinc-100 flex justify-between items-center">
                      <span>Source: {scan.source === 'live_camera' ? 'Live Camera' : 'Photo Upload'}</span>
                      <span className="font-semibold text-black">{user?.dogProfile?.name || 'Pet Record'}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setInspectingRecord(scan)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs shadow-sm transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" /> Full Report
                  </button>

                  <button
                    onClick={() => deleteScanRecord(scan.id)}
                    className="p-2 text-zinc-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Full Inspection Modal */}
      {inspectingRecord && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-3xl w-full my-8">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setInspectingRecord(null)}
                className="bg-white/20 hover:bg-white/30 text-white font-extrabold text-sm px-4 py-2 rounded-full cursor-pointer backdrop-blur-md"
              >
                ✕ Close Report
              </button>
            </div>
            <TickScanResultCard
              scanRecord={inspectingRecord}
              onOpenVetModal={onOpenVetModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};
