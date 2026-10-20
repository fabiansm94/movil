import React from 'react';
import { Home, FileText, ClipboardList, ChevronUp, Plus } from 'lucide-react';
import { MobileTab } from '../types';

interface Props {
  activeTab: MobileTab;
  onChangeTab: (tab: MobileTab) => void;
  onQuickNewEntry: () => void;
  unreadNotesCount?: number;
  isMoreMenuOpen?: boolean;
  onToggleMoreMenu?: () => void;
}

export const BottomNav: React.FC<Props> = ({
  activeTab,
  onChangeTab,
  onQuickNewEntry,
  unreadNotesCount = 2,
  isMoreMenuOpen = false,
  onToggleMoreMenu
}) => {
  return (
    <nav className="sticky bottom-0 left-0 right-0 z-40 bg-[#121316]/98 border-t border-[#252830] backdrop-blur-lg pb-safe shrink-0 shadow-2xl">
      <div className="max-w-lg mx-auto px-2 py-1 flex items-center justify-between relative">
        {/* Tab 1: Inicio */}
        <button
          onClick={() => onChangeTab('inicio')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 transition-all active:scale-95 cursor-pointer ${
            activeTab === 'inicio' ? 'text-red-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Home className="w-5 h-5" />
            {activeTab === 'inicio' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-400" />
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Inicio</span>
        </button>

        {/* Tab 2: Notas (Replaces Registros) */}
        <button
          onClick={() => onChangeTab('notas')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 transition-all active:scale-95 cursor-pointer ${
            activeTab === 'notas' ? 'text-red-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <FileText className="w-5 h-5" />
            {unreadNotesCount > 0 && (
              <span className="absolute -top-0.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-amber-500 text-black text-[9px] flex items-center justify-center font-bold shadow-sm">
                {unreadNotesCount}
              </span>
            )}
            {activeTab === 'notas' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-400" />
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Notas</span>
        </button>

        {/* Center Floating Action Button (Quick Entry / QR Scan) */}
        <div className="flex-1 flex justify-center -mt-5">
          <button
            onClick={onQuickNewEntry}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-red-950/70 border-2 border-[#121316] active:scale-90 transition-transform cursor-pointer"
            title="Registrar acceso rápido"
          >
            <Plus className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Tab 3: Procedimientos (Replaces Xeoma as requested) */}
        <button
          onClick={() => onChangeTab('procedimientos')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 transition-all active:scale-95 cursor-pointer ${
            activeTab === 'procedimientos' ? 'text-red-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <ClipboardList className="w-5 h-5" />
            {activeTab === 'procedimientos' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-400" />
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Procedimientos</span>
        </button>

        {/* Tab 4: Flechita para arriba nada más (Despliega más opciones) */}
        <button
          onClick={() => {
            if (onToggleMoreMenu) {
              onToggleMoreMenu();
            } else {
              onChangeTab('mas');
            }
          }}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-90 cursor-pointer ${
            isMoreMenuOpen ? 'text-red-400' : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Desplegar más opciones"
        >
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              isMoreMenuOpen
                ? 'bg-red-500/20 text-red-400 ring-1 ring-red-500/40 shadow-sm'
                : 'hover:bg-white/5 text-slate-300'
            }`}
          >
            <ChevronUp
              className={`w-5 h-5 stroke-[2.5] transition-transform duration-200 ${
                isMoreMenuOpen ? 'rotate-180 text-red-400' : ''
              }`}
            />
          </div>
        </button>
      </div>
    </nav>
  );
};
