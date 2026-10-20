import React from 'react';
import {
  X,
  Video,
  Building2,
  Users,
  ShieldAlert,
  HelpCircle,
  HardHat,
  Hotel,
  ClipboardList,
  Sparkles,
  ChevronRight,
  Plus
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenXeoma: () => void;
  onOpenCondos: () => void;
  onOpenShift: () => void;
  onOpenPolice: () => void;
  onOpenWebSupport: () => void;
  onOpenStaffCima: () => void;
  onOpenPumilio: () => void;
  onOpenProcedimientos: () => void;
}

export const MoreOptionsMenu: React.FC<Props> = ({
  isOpen,
  onClose,
  onOpenXeoma,
  onOpenCondos,
  onOpenShift,
  onOpenPolice,
  onOpenWebSupport,
  onOpenStaffCima,
  onOpenPumilio,
  onOpenProcedimientos
}) => {
  if (!isOpen) return null;

  const menuOptions = [
    {
      title: 'Monitoreo Xeoma CCTV',
      desc: 'Cámaras en vivo y control de circuito cerrado',
      icon: Video,
      color: 'text-red-400 bg-red-950/60 border-red-500/40',
      action: onOpenXeoma
    },
    {
      title: 'Procedimientos Operativos',
      desc: 'Protocolos y consignas de seguridad STS',
      icon: ClipboardList,
      color: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40',
      action: onOpenProcedimientos
    },
    {
      title: 'Staff Cima Real',
      desc: 'Gestión de personal de construcción',
      icon: HardHat,
      color: 'text-orange-400 bg-orange-950/60 border-orange-500/40',
      action: onOpenStaffCima
    },
    {
      title: 'Hotel Pumilio',
      desc: 'Registro diario y control de accesos',
      icon: Hotel,
      color: 'text-purple-400 bg-purple-950/60 border-purple-500/40',
      action: onOpenPumilio
    },
    {
      title: 'Condominios y Residencias',
      desc: '9 proyectos y 171 unidades habitacionales',
      icon: Building2,
      color: 'text-blue-400 bg-blue-950/60 border-blue-500/40',
      action: onOpenCondos
    },
    {
      title: 'Oficiales en Turno',
      desc: 'Asignación de puestos y relevos',
      icon: Users,
      color: 'text-cyan-400 bg-cyan-950/60 border-cyan-500/40',
      action: onOpenShift
    },
    {
      title: 'Policía & Emergencias',
      desc: 'Contactos directos municipales y 911',
      icon: ShieldAlert,
      color: 'text-rose-400 bg-rose-950/60 border-rose-500/40',
      action: onOpenPolice
    },
    {
      title: 'Mesa de Ayuda STS',
      desc: 'Soporte técnico y solicitudes de garita',
      icon: HelpCircle,
      color: 'text-amber-400 bg-amber-950/60 border-amber-500/40',
      action: onOpenWebSupport
    }
  ];

  return (
    <div
      onClick={onClose}
      className="absolute inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full bg-[#121316] border-t border-[#2d303b] rounded-t-3xl max-h-[82vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-200"
      >
        {/* Drag handle */}
        <div className="w-10 h-1 bg-slate-600/50 rounded-full mx-auto mt-2.5 mb-1 shrink-0" />

        {/* Header */}
        <div className="px-4 py-2.5 border-b border-[#22242e] flex items-center justify-between shrink-0">
          <div>
            <span className="text-sm font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-red-400" />
              Más Opciones
            </span>
            <span className="text-[10px] text-slate-400 block">
              Módulos y herramientas del sistema
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1c1e26] hover:bg-[#252834] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable List of Options */}
        <div className="p-3 space-y-2 overflow-y-auto max-h-[65vh] scrollbar-thin">
          <div className="grid grid-cols-1 gap-2">
            {menuOptions.map((opt, i) => {
              const Icon = opt.icon;
              return (
                <button
                  key={i}
                  onClick={() => {
                    opt.action();
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-2xl bg-[#17181d] hover:bg-[#20222a] border border-[#262832] hover:border-[#383d4c] flex items-center justify-between gap-3 transition-all text-left group active:scale-[0.99] cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${opt.color}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-white group-hover:text-red-400 transition-colors block truncate">
                        {opt.title}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {opt.desc}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors shrink-0" />
                </button>
              );
            })}
          </div>

          {/* Reserved placeholder slot for future options as requested */}
          <div className="p-3 rounded-2xl border-2 border-dashed border-[#292c38] bg-[#14151a]/60 text-center space-y-1 mt-1">
            <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs font-semibold">
              <Plus className="w-3.5 h-3.5 text-slate-500" />
              <span>Espacio para nuevas opciones</span>
            </div>
            <p className="text-[10px] text-slate-500">
              Aquí se integrarán las funciones adicionales que luego añadiremos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
