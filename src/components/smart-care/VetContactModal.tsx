import React, { useState } from 'react';
import {
  PhoneCall,
  Stethoscope,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  FileText,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

interface VetContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PARTNER_VETS = [
  {
    name: 'Cessna Lifeline Veterinary Hospital',
    city: 'Bengaluru / Pan-India Teleconsult',
    phone: '+91 80 4567 8900',
    emergency: '24/7 Emergency & ICU',
    rating: '4.9 ★'
  },
  {
    name: 'DCC Animal Hospital & Telecare',
    city: 'Delhi NCR / Mumbai / Online',
    phone: '+91 11 4500 1200',
    emergency: 'Available 8 AM - 11 PM',
    rating: '4.8 ★'
  },
  {
    name: 'Crown Vet Multi-Speciality Clinic',
    city: 'Mumbai / Pune / Hyderabad',
    phone: '+91 22 2490 5500',
    emergency: '24/7 Helpline',
    rating: '4.9 ★'
  }
];

export const VetContactModal: React.FC<VetContactModalProps> = ({
  isOpen,
  onClose
}) => {
  const { user, activeScanRecord, addToast } = useShop();

  const [message, setMessage] = useState<string>(
    `Hello Doctor, I completed a DoggyBhai Smart Care visual screening for my dog ${
      user?.dogProfile?.name ? `(${user.dogProfile.name})` : ''
    } and would like your professional consultation regarding possible tick spots.`
  );
  const [phone, setPhone] = useState<string>(user?.phone || '+91 98765 12345');
  const [preferredTime, setPreferredTime] = useState<string>('As soon as possible');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    addToast('Tele-consultation request sent to partner veterinarian team!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-zinc-200 shadow-2xl animate-scale-up space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-black font-heading">
                Veterinary Consultation Assistance
              </h3>
              <p className="text-xs text-zinc-500">
                Connect with licensed veterinarians across India
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

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-extrabold text-black font-heading">
              Consultation Request Received!
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
              Our partner veterinary clinic will call you at <strong>{phone}</strong> within 15–30 minutes with screening notes pre-attached.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs shadow-md transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* National Emergency Hotline Banner */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <PhoneCall className="w-5 h-5 text-amber-700 shrink-0" />
                <div>
                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-amber-950">
                    24/7 National Pet Emergency Line
                  </h5>
                  <p className="text-xs text-amber-800 font-medium">
                    Immediate triage assistance for high fever, lethargy, or heavy tick burden.
                  </p>
                </div>
              </div>
              <a
                href="tel:18001234567"
                className="px-3 py-1.5 bg-amber-600 text-white text-xs font-extrabold rounded-lg hover:bg-amber-700 whitespace-nowrap"
              >
                Call Helpline
              </a>
            </div>

            {/* Attached Scan Info */}
            {activeScanRecord && (
              <div className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200 text-xs flex items-center gap-3">
                <img
                  src={activeScanRecord.imageUrl}
                  alt="Scan thumbnail"
                  className="w-12 h-12 rounded-xl object-cover border border-zinc-300"
                />
                <div className="space-y-0.5">
                  <p className="font-bold text-black flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-orange-500" />
                    Attaching Latest Visual Scan Report
                  </p>
                  <p className="text-zinc-500 text-[11px]">
                    {activeScanRecord.dogName} • {activeScanRecord.areaScanned} area • {activeScanRecord.result.title}
                  </p>
                </div>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl font-bold text-sm text-black focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-1">
                  Preferred Consultation Slot
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl font-bold text-sm text-black focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <option>As soon as possible (Immediate Triage)</option>
                  <option>Morning (9 AM - 12 PM)</option>
                  <option>Afternoon (1 PM - 5 PM)</option>
                  <option>Evening (6 PM - 9 PM)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-1">
                  Notes for the Veterinarian
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-xs text-black focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Partner Clinic Directory */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Recommended Clinic Partners:
              </span>
              <div className="space-y-2">
                {PARTNER_VETS.map((vet, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs flex items-center justify-between"
                  >
                    <div>
                      <h6 className="font-bold text-black">{vet.name}</h6>
                      <p className="text-zinc-500 text-[11px]">{vet.city} • {vet.emergency}</p>
                    </div>
                    <span className="text-emerald-700 font-extrabold">{vet.rating}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-black"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs shadow-md transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                REQUEST VET CALLBACK
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
