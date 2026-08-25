import React from 'react';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bgColor = 'bg-zinc-900 text-white border-zinc-800';
        let Icon = CheckCircle2;
        let iconColor = 'text-emerald-400';

        if (toast.type === 'error') {
          bgColor = 'bg-red-950 text-red-100 border-red-800';
          Icon = XCircle;
          iconColor = 'text-red-400';
        } else if (toast.type === 'warning') {
          bgColor = 'bg-amber-950 text-amber-100 border-amber-800';
          Icon = AlertCircle;
          iconColor = 'text-amber-400';
        } else if (toast.type === 'info') {
          bgColor = 'bg-zinc-900 text-zinc-100 border-zinc-700';
          Icon = Info;
          iconColor = 'text-sky-400';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl border shadow-xl flex items-center justify-between gap-3 text-xs font-medium backdrop-blur-md animate-in slide-in-from-bottom duration-200 ${bgColor}`}
          >
            <div className="flex items-center gap-2.5">
              <Icon className={`w-4 h-4 shrink-0 ${iconColor}`} />
              <span className="leading-snug">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-white/10 rounded-md transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
