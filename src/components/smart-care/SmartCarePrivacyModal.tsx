import React from 'react';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Key,
  Server,
  FileCheck,
  CheckCircle2
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

interface SmartCarePrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SmartCarePrivacyModal: React.FC<SmartCarePrivacyModalProps> = ({
  isOpen,
  onClose
}) => {
  const { user } = useShop();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-zinc-200 shadow-2xl animate-scale-up space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-black font-heading">
                Privacy & Data Security
              </h3>
              <p className="text-xs text-zinc-500">
                DoggyBhai Smart Care Privacy Guarantee
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-black font-bold text-sm p-1"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-zinc-700 leading-relaxed">
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
            <Lock className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-black text-xs uppercase tracking-wider">
                End-to-End Encrypted Live Stream
              </h4>
              <p className="text-zinc-600 text-xs mt-0.5">
                All video and audio streams from your home cameras are encrypted with AES-256 in transit and never stored on public cloud servers without your explicit permission.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
            <EyeOff className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-black text-xs uppercase tracking-wider">
                Private to Your Account
              </h4>
              <p className="text-zinc-600 text-xs mt-0.5">
                Only authenticated devices logged into <strong>{user?.email || 'your DoggyBhai account'}</strong> have decryption keys to view your live camera or past coat scans.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
            <Server className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-black text-xs uppercase tracking-wider">
                On-Demand Assistive Screening
              </h4>
              <p className="text-zinc-600 text-xs mt-0.5">
                AI Tick Check operates on user-initiated frames only. Continuous automated recording is controlled entirely by you via camera toggle switches.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
          <span className="text-[11px] text-zinc-400">
            Compliant with Indian DPDP Act guidelines
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs shadow-md transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
