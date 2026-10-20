import React, { useState } from 'react';
import {
  X,
  ClipboardList,
  CalendarClock,
  Building2,
  ChevronDown
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: (condoName: string) => void;
}

const CONDOMINIOS = [
  'Foresta',
  'Sunset Hills',
  'Hotel Pumilio',
  'Cima Real',
  'Bosque Real',
  'Vistas del Sol',
  'Trejos Montealegre',
  'Lindora Park',
  'Avalon Flats'
];

export const RegistroDiarioModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onOpenRegister
}) => {
  const [selectedCondo, setSelectedCondo] = useState('Foresta');

  if (!isOpen) return null;

  const handleOpen = () => {
    onOpenRegister(selectedCondo);
  };

  return (
    <div
      onClick={onClose}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150 overflow-hidden"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[370px] bg-[#111216] border border-[#242630] rounded-2xl shadow-2xl p-5 flex flex-col gap-4 animate-in zoom-in-95 duration-150"
      >
        {/* Top Header - Matching Screenshot */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ClipboardList className="w-5 h-5 text-[#f87171]" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Registro Diario
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
            title="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Inner Card - Matching Screenshot */}
        <div className="bg-[#16171d] border border-[#262835] rounded-xl p-4 sm:p-5 space-y-4">
          {/* Calendar Clock Header inside card */}
          <div className="flex items-start gap-3">
            <div className="text-[#f87171] mt-0.5 shrink-0">
              <CalendarClock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Registro Diario</h3>
              <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                Selecciona dónde guardar la visita.
              </p>
            </div>
          </div>

          {/* Select Condominio Section */}
          <div className="space-y-2 pt-1">
            <label className="block text-xs font-semibold text-slate-200">
              Selecciona un condominio
            </label>

            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Building2 className="w-4 h-4" />
              </div>

              <select
                value={selectedCondo}
                onChange={(e) => setSelectedCondo(e.target.value)}
                className="w-full bg-[#0d0e12] border border-[#2c2f3d] rounded-xl py-2.5 pl-10 pr-9 text-xs sm:text-sm text-white appearance-none focus:outline-none focus:border-[#d95d5d] cursor-pointer"
              >
                {CONDOMINIOS.map((condo) => (
                  <option key={condo} value={condo} className="bg-[#14151a] text-white">
                    {condo}
                  </option>
                ))}
              </select>

              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Action Button - Soft coral red matching screenshot */}
          <button
            onClick={handleOpen}
            className="w-full py-2.5 px-4 rounded-xl bg-[#d95d5d] hover:bg-[#c94f4f] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 cursor-pointer text-center"
          >
            Abrir Registro Diario
          </button>
        </div>
      </div>
    </div>
  );
};
