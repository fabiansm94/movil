import React from 'react';
import { Smartphone, Apple, Check } from 'lucide-react';
import { DevicePreviewMode } from '../types';

interface Props {
  mode: DevicePreviewMode;
  onChange: (mode: DevicePreviewMode) => void;
}

export const DeviceFrameSelector: React.FC<Props> = ({ mode, onChange }) => {
  return (
    <aside aria-label="Selector de vista y dispositivo" className="bg-[#18191d] border-b border-[#2a2d34] px-3 py-2 flex items-center justify-between text-xs text-slate-300">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-semibold text-slate-200 hidden sm:inline">Modo Móvil</span>
        <span className="text-slate-400 text-[11px]">Diseño responsive iOS & Android</span>
      </div>

      <div className="flex items-center gap-1 bg-[#101114] p-1 rounded-lg border border-[#272a31]">
        <button
          onClick={() => onChange('responsive')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
            mode === 'responsive'
              ? 'bg-[#e14c4c] text-white font-medium shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Vista fluida responsive"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Fluido</span>
          {mode === 'responsive' && <Check className="w-3 h-3 ml-0.5" />}
        </button>

        <button
          onClick={() => onChange('ios')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
            mode === 'ios'
              ? 'bg-[#e14c4c] text-white font-medium shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Simulador iPhone iOS"
        >
          <Apple className="w-3.5 h-3.5" />
          <span>iPhone iOS</span>
          {mode === 'ios' && <Check className="w-3 h-3 ml-0.5" />}
        </button>

        <button
          onClick={() => onChange('android')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
            mode === 'android'
              ? 'bg-[#e14c4c] text-white font-medium shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Simulador Android"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Android</span>
          {mode === 'android' && <Check className="w-3 h-3 ml-0.5" />}
        </button>
      </div>
    </aside>
  );
};
