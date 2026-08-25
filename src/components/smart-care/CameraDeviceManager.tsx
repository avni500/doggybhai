import React, { useState } from 'react';
import {
  Video,
  Plus,
  Settings,
  Trash2,
  Lock,
  Wifi,
  Battery,
  Zap,
  Eye,
  CheckCircle2,
  RefreshCw,
  MoreVertical,
  Shield
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { SmartCamera } from '../../types';

interface CameraDeviceManagerProps {
  onOpenSetup: () => void;
  onSelectCameraToView: (id: string) => void;
}

export const CameraDeviceManager: React.FC<CameraDeviceManagerProps> = ({
  onOpenSetup,
  onSelectCameraToView
}) => {
  const {
    cameras,
    activeCameraId,
    setActiveCameraId,
    toggleCameraOnline,
    toggleCameraRemoteAccess,
    updateCamera,
    deleteCamera,
    addToast
  } = useShop();

  const [editingCamera, setEditingCamera] = useState<SmartCamera | null>(null);
  const [newName, setNewName] = useState<string>('');
  const [newLocation, setNewLocation] = useState<string>('');

  const handleStartEdit = (cam: SmartCamera) => {
    setEditingCamera(cam);
    setNewName(cam.name);
    setNewLocation(cam.location);
  };

  const handleSaveEdit = () => {
    if (editingCamera) {
      updateCamera(editingCamera.id, {
        name: newName.trim() || editingCamera.name,
        location: newLocation.trim() || editingCamera.location
      });
      setEditingCamera(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-black font-heading tracking-tight">
            Connected Camera Devices ({cameras.length})
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Manage your pet monitoring cameras, adjust stream quality, and control remote privacy access.
          </p>
        </div>

        <button
          onClick={onOpenSetup}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          PAIR NEW CAMERA
        </button>
      </div>

      {/* Camera Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cameras.map((cam) => {
          const isActive = cam.id === activeCameraId;
          return (
            <div
              key={cam.id}
              className={`bg-white rounded-3xl border transition-all duration-200 overflow-hidden shadow-sm flex flex-col justify-between ${
                isActive ? 'border-orange-500 ring-2 ring-orange-500/20' : 'border-zinc-200 hover:border-zinc-300'
              }`}
            >
              <div>
                {/* Camera Card Top Thumbnail / Status */}
                <div className="relative aspect-video bg-zinc-950 overflow-hidden group">
                  <img
                    src={
                      cam.demoVideoType === 'playing'
                        ? 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80'
                        : cam.demoVideoType === 'sleeping'
                        ? 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
                        : 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80'
                    }
                    alt={cam.name}
                    className={`w-full h-full object-cover filter transition-all ${
                      cam.isOnline ? 'brightness-90 group-hover:scale-105' : 'grayscale brightness-50'
                    }`}
                  />

                  {/* Status Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    {cam.isOnline ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-emerald-600/90 text-white backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        ONLINE
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-zinc-800/90 text-zinc-300 backdrop-blur-md">
                        OFFLINE
                      </span>
                    )}
                  </div>

                  {/* Quick Action overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => {
                        setActiveCameraId(cam.id);
                        onSelectCameraToView(cam.id);
                      }}
                      className="px-4 py-2 bg-orange-500 text-white font-extrabold text-xs rounded-xl shadow-lg hover:bg-orange-600 transition-transform cursor-pointer"
                    >
                      OPEN LIVE STREAM
                    </button>
                  </div>
                </div>

                {/* Camera Card Info */}
                <div className="p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-extrabold text-base text-black font-heading">
                        {cam.name}
                      </h3>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Location: <span className="text-zinc-800 font-semibold">{cam.location}</span>
                      </p>
                    </div>

                    <button
                      onClick={() => handleStartEdit(cam)}
                      className="p-1.5 text-zinc-400 hover:text-black rounded-lg hover:bg-zinc-100 transition-colors"
                      title="Edit Camera Details"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Specs & Hardware indicators */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-zinc-600 pt-2 border-t border-zinc-100">
                    <div className="flex items-center gap-1.5">
                      <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{cam.resolution}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {cam.isWired ? (
                        <>
                          <Zap className="w-3.5 h-3.5 text-blue-600" />
                          <span>Wired Power</span>
                        </>
                      ) : (
                        <>
                          <Battery className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{cam.batteryLevel}% Battery</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Remote Access Toggle */}
                  <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-2xl border border-zinc-200 text-xs">
                    <div className="flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-zinc-500" />
                      <div>
                        <p className="font-bold text-black">Remote Access</p>
                        <p className="text-[10px] text-zinc-500">
                          {cam.remoteAccessEnabled ? 'Encrypted Web Stream' : 'Local Only'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleCameraRemoteAccess(cam.id)}
                      className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                        cam.remoteAccessEnabled ? 'bg-emerald-500' : 'bg-zinc-300'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                          cam.remoteAccessEnabled ? 'right-1' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => toggleCameraOnline(cam.id)}
                  className="text-xs font-bold text-zinc-600 hover:text-black py-1 px-2 rounded-lg hover:bg-zinc-200 transition-colors"
                >
                  {cam.isOnline ? 'Simulate Offline' : 'Reconnect'}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setActiveCameraId(cam.id);
                      onSelectCameraToView(cam.id);
                    }}
                    className="px-3.5 py-1.5 bg-black hover:bg-zinc-800 text-white font-extrabold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
                  >
                    View
                  </button>
                  <button
                    onClick={() => deleteCamera(cam.id)}
                    className="p-1.5 text-zinc-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    title="Remove Camera"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Camera Modal */}
      {editingCamera && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-zinc-200 shadow-2xl animate-scale-up">
            <h3 className="text-lg font-extrabold text-black font-heading pb-3 border-b border-zinc-100">
              Edit Camera Settings
            </h3>
            <div className="space-y-4 my-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-1">
                  Camera Name
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl font-bold text-sm text-black focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-1">
                  Location / Room
                </label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl font-bold text-sm text-black focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100">
              <button
                onClick={() => setEditingCamera(null)}
                className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs shadow-md transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
