import React from 'react';
import { Sparkles, ClipboardList, UserCheck, Clock, Hotel, HardHat } from 'lucide-react';

interface Props {
  onSelectAction: (actionKey: string, title: string) => void;
  onNewFastEntry?: () => void;
}

export const QuickAccessBar: React.FC<Props> = ({ onSelectAction }) => {
  const quickActions = [
    {
      id: 'registro-diario',
      title: 'Registro Diario',
      icon: ClipboardList,
      bg: 'bg-[#2b1f20] hover:bg-[#382627]',
      border: 'border-[#4a2e30]',
      text: 'text-[#fca5a5]'
    },
    {
      id: 'asistencia-foresta',
      title: 'Asistencia Foresta',
      icon: UserCheck,
      bg: 'bg-[#152720] hover:bg-[#1c352b]',
      border: 'border-[#214336]',
      text: 'text-[#86efac]'
    },
    {
      id: 'asistencia-sunset',
      title: 'Asistencia Sunset',
      icon: Clock,
      bg: 'bg-[#292215] hover:bg-[#382d1c]',
      border: 'border-[#4b3c22]',
      text: 'text-[#fde047]'
    },
    {
      id: 'registro-pumilio',
      title: 'Registro Hotel Pumilio',
      icon: Hotel,
      bg: 'bg-[#231b2e] hover:bg-[#312541]',
      border: 'border-[#423157]',
      text: 'text-[#d8b4fe]'
    },
    {
      id: 'staff-cima-real',
      title: 'Staff Cima Real',
      icon: HardHat,
      bg: 'bg-[#261f1c] hover:bg-[#382c27]',
      border: 'border-[#483730]',
      text: 'text-[#fdba74]'
    }
  ];

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-red-400" />
          <span>Acceso Rápido</span>
        </div>
      </div>

      {/* Horizontal scrollable buttons with smooth touch scrolling and end padding */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar scroll-smooth touch-pan-x -mx-1 px-1">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => onSelectAction(action.id, action.title)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl ${action.bg} border ${action.border} ${action.text} text-xs font-medium whitespace-nowrap active:scale-95 transition-all shadow-sm shrink-0 cursor-pointer`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{action.title}</span>
            </button>
          );
        })}
        {/* End spacing element to prevent clipping on Android */}
        <div className="w-2 shrink-0" />
      </div>
    </div>
  );
};
