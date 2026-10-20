import React from 'react';
import { Shield, Bell, ChevronRight, X } from 'lucide-react';

interface Props {
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onStartShift: () => void;
  shiftStarted: boolean;
  unreadCount?: number;
}

export const MobileHeader: React.FC<Props> = ({
  onOpenNotifications,
  onOpenProfile,
  onStartShift,
  shiftStarted,
  unreadCount = 3
}) => {
  const [bannerDismissed, setBannerDismissed] = React.useState(false);

  return (
    <header className="sticky top-0 z-30 bg-[#121316] border-b border-[#24272e] backdrop-blur-md">
      {/* Top Warning/Instruction Banner from original screenshot */}
      {!bannerDismissed && (
        <div className="bg-[#cc2b2b] text-white px-3 py-1.5 text-[11px] font-medium flex items-center justify-between gap-2 shadow-sm transition-all">
          <button
            onClick={onStartShift}
            className="flex-1 text-left line-clamp-1 hover:underline cursor-pointer flex items-center gap-1.5"
            title="Toca para iniciar turno"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping shrink-0" />
            <span>
              {shiftStarted
                ? 'Turno activo: Fabian (Supervisor STS) - Operando'
                : 'Recuerda iniciar turno con tu propio usuario para registrar tus actividades correctamente'}
            </span>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-80" />
          </button>
          <button
            onClick={() => setBannerDismissed(true)}
            className="p-1 hover:bg-red-800/50 rounded text-red-100 transition-colors"
            title="Cerrar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main App Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#e14c4c] to-[#b91c1c] flex items-center justify-center shadow-lg shadow-red-950/40 border border-red-400/20">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold tracking-tight text-white uppercase">
                Control y Monitoreo
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Garita & Accesos STS</span>
            </div>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button
            onClick={onOpenNotifications}
            aria-label="Avisos y notificaciones"
            className="relative w-9 h-9 rounded-xl bg-[#1b1d22] border border-[#2b2e37] flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#23262d] active:scale-95 transition-all"
            title="Avisos y novedades"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#e14c4c] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-[#121316]">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile Avatar with indicator */}
          <button
            onClick={onOpenProfile}
            aria-label="Perfil de usuario Fabian"
            className="flex items-center gap-1.5 p-1 rounded-xl bg-[#1b1d22] border border-[#2b2e37] hover:bg-[#23262d] active:scale-95 transition-all"
            title="Perfil de Fabian"
          >
            <div className="relative">
              <div className="w-7 h-7 rounded-lg bg-emerald-800 text-emerald-100 flex items-center justify-center text-xs font-bold ring-1 ring-emerald-500/30">
                F
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-1.5 ring-[#121316]" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
