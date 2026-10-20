import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Car,
  Home,
  Phone,
  Calendar,
  AlertTriangle,
  User,
  ArrowRightCircle,
  ArrowLeftCircle,
  ShieldCheck,
  Check
} from 'lucide-react';
import { AuthorizedPerson } from '../types';

interface Props {
  person: AuthorizedPerson | null;
  onClose: () => void;
  onLogAccess: (type: 'entrada' | 'salida', person: AuthorizedPerson) => void;
  isFramed?: boolean;
}

export const RecordDetailSheet: React.FC<Props> = ({ person, onClose, onLogAccess, isFramed = false }) => {
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  if (!person) return null;

  const handleAction = (type: 'entrada' | 'salida') => {
    onLogAccess(type, person);
    setActionFeedback(type === 'entrada' ? '✅ Entrada registrada con éxito' : '🚪 Salida registrada con éxito');
    setTimeout(() => {
      setActionFeedback(null);
    }, 2200);
  };

  return (
    <div
      onClick={onClose}
      className="absolute inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm p-0 animate-in fade-in duration-150 overflow-hidden"
    >
      <div
        className="w-full bg-[#18191e] border-t border-[#2f323c] rounded-t-3xl max-h-[92%] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Native mobile drag handle */}
        <div className="w-12 h-1.5 bg-slate-600/60 rounded-full mx-auto mt-2.5 mb-1 shrink-0" />

        {/* Header */}
        <div className="px-4 py-3 border-b border-[#252830] flex items-center justify-between shrink-0 bg-[#18191e] z-10">
          <div className="min-w-0 pr-2">
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block truncate">
              Vista previa de registro
            </span>
            <h2 className="text-sm font-bold text-white truncate max-w-[260px]">
              {person.fullName}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#23262e] border border-[#323642] flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body with internal scrolling */}
        <div className="p-4 space-y-3.5 flex-1 overflow-y-auto overscroll-contain touch-pan-y scrollbar-thin">
          {actionFeedback && (
            <div className="p-3 rounded-xl bg-emerald-950/90 border border-emerald-600/60 text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-bounce">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{actionFeedback}</span>
            </div>
          )}

          {/* Status & Badge summary */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#121316] border border-[#262830]">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-300 font-bold text-lg">
                <User className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-100">{person.type}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-xs text-slate-400 font-mono">ID: {person.cedula}</span>
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                person.status === 'Activo'
                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-600/40'
                  : 'bg-red-900/60 text-red-300 border border-red-600/40'
              }`}
            >
              {person.status}
            </span>
          </div>

          {/* Location & Vehicle Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#121316] border border-[#262830] space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Home className="w-3.5 h-3.5 text-red-400" />
                <span className="font-medium">Destino / Residencia</span>
              </div>
              <p className="font-bold text-white text-sm">{person.condoName}</p>
              <p className="text-slate-300 font-semibold">{person.unitNumber}</p>
            </div>

            <div className="p-3 rounded-xl bg-[#121316] border border-[#262830] space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Car className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-medium">Vehículo Autorizado</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-600/40 text-amber-300 font-mono font-bold text-xs">
                  {person.licensePlate}
                </span>
              </div>
              <p className="text-slate-300 text-[11px] truncate">{person.vehicleModel || 'Modelo no especificado'}</p>
            </div>
          </div>

          {/* Contact and Validity */}
          <div className="p-3 rounded-xl bg-[#121316] border border-[#262830] space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                Teléfono de contacto
              </span>
              <a
                href={`tel:${person.phone}`}
                className="text-blue-400 font-semibold hover:underline"
              >
                {person.phone}
              </a>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#202228]">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                Vigencia del permiso
              </span>
              <span className="text-slate-200 font-medium">{person.validUntil || 'Permanente'}</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#202228]">
              <span className="text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                Último ingreso
              </span>
              <span className="text-slate-300 font-medium">{person.lastAccess || 'Hoy'}</span>
            </div>
          </div>

          {/* Notes */}
          {person.notes && (
            <div className="p-3 rounded-xl bg-[#201d18] border border-[#3d3221] text-xs space-y-1">
              <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Observaciones del oficial / seguridad:
              </span>
              <p className="text-amber-100/90 leading-relaxed text-[11px]">{person.notes}</p>
            </div>
          )}

          {/* Action Buttons for Mobile Guard */}
          <div className="pt-2 grid grid-cols-2 gap-2.5">
            <button
              onClick={() => handleAction('entrada')}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 active:scale-95 transition-all"
            >
              <ArrowRightCircle className="w-4 h-4" />
              <span>Registrar Entrada</span>
            </button>

            <button
              onClick={() => handleAction('salida')}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs border border-slate-600 shadow-md active:scale-95 transition-all"
            >
              <ArrowLeftCircle className="w-4 h-4" />
              <span>Registrar Salida</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${person.phone}`}
              className="flex-1 py-2 px-3 rounded-xl bg-[#1e2026] hover:bg-[#282a32] text-slate-200 font-medium text-xs flex items-center justify-center gap-1.5 border border-[#2d3039]"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>Llamar al Residente</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
