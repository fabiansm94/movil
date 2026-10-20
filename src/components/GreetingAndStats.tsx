import React from 'react';
import { Building2, Home, Globe, Megaphone, Wrench, BookOpen } from 'lucide-react';

interface Props {
  onOpenNotes: () => void;
  onOpenAvisos: () => void;
  onOpenTechSupport: () => void;
  onOpenCondosList?: () => void;
  onOpenWebSupport: () => void;
}

export const GreetingAndStats: React.FC<Props> = ({
  onOpenNotes,
  onOpenAvisos,
  onOpenTechSupport,
  onOpenWebSupport
}) => {
  return (
    <div className="bg-[#18191d] rounded-2xl p-3.5 border border-[#272a32] shadow-md space-y-3">
      {/* Greeting line */}
      <div className="space-y-1">
        <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
          <span>Buenos días, Fabian</span>
          <span className="inline-block animate-bounce">👋</span>
        </h1>
        <button
          onClick={onOpenNotes}
          className="text-xs text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1.5 group text-left cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-red-400 shrink-0 group-hover:scale-110 transition-transform" />
          <span className="underline decoration-slate-600 underline-offset-2">
            Recuerda leer las notas diarias.
          </span>
        </button>
      </div>

      {/* Action buttons (Soporte Web, Avisos, Soporte Tecs) in a responsive 3-col grid so they never overflow */}
      <div className="grid grid-cols-3 gap-1.5 pt-0.5">
        <button
          onClick={onOpenWebSupport}
          className="flex items-center justify-center gap-1 px-1.5 py-1.5 rounded-lg bg-[#141d2d] border border-[#1e2e48] text-[#60a5fa] text-[10px] sm:text-[11px] font-medium hover:bg-[#1a263c] active:scale-95 transition-all truncate cursor-pointer"
          title="Soporte Web"
        >
          <Globe className="w-3 h-3 shrink-0" />
          <span className="truncate">Soporte Web</span>
        </button>

        <button
          onClick={onOpenAvisos}
          className="flex items-center justify-center gap-1 px-1.5 py-1.5 rounded-lg bg-[#271d15] border border-[#44301f] text-[#fbbf24] text-[10px] sm:text-[11px] font-medium hover:bg-[#33251a] active:scale-95 transition-all truncate"
          title="Avisos"
        >
          <Megaphone className="w-3 h-3 shrink-0" />
          <span className="truncate">Avisos</span>
        </button>

        <button
          onClick={onOpenTechSupport}
          className="flex items-center justify-center gap-1 px-1.5 py-1.5 rounded-lg bg-[#122421] border border-[#1b3d36] text-[#34d399] text-[10px] sm:text-[11px] font-medium hover:bg-[#172f2b] active:scale-95 transition-all truncate"
          title="Soporte Tecs"
        >
          <Wrench className="w-3 h-3 shrink-0" />
          <span className="truncate">Soporte Tecs</span>
        </button>
      </div>

      {/* Condominium & Units counters */}
      <div className="flex items-center gap-1.5 pt-2 border-t border-[#23262e] text-[11px]">
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#202228] border border-[#2e313b] text-slate-300 select-none cursor-default">
          <Building2 className="w-3 h-3 text-red-400 shrink-0" />
          <span className="font-semibold text-white">9</span>
          <span className="text-slate-400">condos</span>
        </div>

        <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#202228] border border-[#2e313b] text-slate-300 select-none cursor-default">
          <Home className="w-3 h-3 text-red-400 shrink-0" />
          <span className="font-semibold text-white">171</span>
          <span className="text-slate-400">unidades</span>
        </div>
      </div>
    </div>
  );
};
