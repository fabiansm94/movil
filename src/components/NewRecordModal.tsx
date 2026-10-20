import React, { useState, useEffect } from 'react';
import { X, UserPlus, Shield, Car, Home, CreditCard, Check } from 'lucide-react';
import { AuthorizedPerson } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (person: AuthorizedPerson) => void;
  isFramed?: boolean;
  initialCondo?: string;
}

export const NewRecordModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  isFramed = false,
  initialCondo
}) => {
  const [fullName, setFullName] = useState('');
  const [cedula, setCedula] = useState('');
  const [type, setType] = useState<AuthorizedPerson['type']>('Visitante Frecuente');
  const [condoName, setCondoName] = useState('Condominio Foresta');
  const [unitNumber, setUnitNumber] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialCondo) {
      const match = initialCondo.toLowerCase();
      if (match.includes('foresta')) setCondoName('Condominio Foresta');
      else if (match.includes('sunset')) setCondoName('Condominio Sunset Hills');
      else if (match.includes('pumilio')) setCondoName('Hotel Pumilio');
      else if (match.includes('cima')) setCondoName('Condominio Cima Real');
      else if (match.includes('bosque')) setCondoName('Bosque Real Residencial');
      else if (match.includes('vistas')) setCondoName('Vistas del Sol');
      else if (match.includes('trejos')) setCondoName('Trejos Montealegre Condos');
      else if (match.includes('lindora')) setCondoName('Lindora Park Executive');
      else if (match.includes('avalon')) setCondoName('Avalon Flats');
      else setCondoName(initialCondo);
    }
  }, [initialCondo, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !cedula.trim()) return;

    const newPerson: AuthorizedPerson = {
      id: `rec-${Date.now()}`,
      cedula: cedula.trim(),
      fullName: fullName.trim(),
      type,
      condoName,
      unitNumber: unitNumber.trim() || 'Garita General',
      licensePlate: licensePlate.trim().toUpperCase() || 'PEATONAL',
      vehicleModel: vehicleModel.trim() || undefined,
      phone: phone.trim() || '+506 2200-0000',
      status: 'Activo',
      notes: notes.trim() || 'Ingreso autorizado por supervisor de turno.',
      validUntil: 'Hoy (Temporal)',
      lastAccess: 'Justo ahora'
    };

    onSave(newPerson);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="absolute inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm p-0 animate-in fade-in overflow-hidden"
    >
      <div
        className="w-full bg-[#18191d] border-t border-[#2f323c] rounded-t-3xl h-[92%] max-h-[92%] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 bg-slate-600/50 rounded-full mx-auto mt-2.5 mb-1 shrink-0" />

        <div className="px-4 py-3 border-b border-[#252830] flex items-center justify-between shrink-0 bg-[#18191d] z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">
                Registrar Ingreso / Autorizado
              </h2>
              <span className="text-[11px] text-slate-400">
                Control de garita y acceso
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#23262e] border border-[#323642] flex items-center justify-center text-slate-300 hover:text-white cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3.5 flex-1 overflow-y-auto overscroll-contain touch-pan-y scrollbar-thin">
          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">
              Nombre Completo *
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ej. Juan Carlos Morales Pérez"
              className="w-full px-3 py-2.5 bg-[#121316] border border-[#2b2e37] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Cédula / Pasaporte *
              </label>
              <input
                type="text"
                required
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                placeholder="1-0000-0000"
                className="w-full px-3 py-2 bg-[#121316] border border-[#2b2e37] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Tipo de Ingreso
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#121316] border border-[#2b2e37] rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
              >
                <option value="Visitante Frecuente">Visitante</option>
                <option value="Familiar">Familiar</option>
                <option value="Proveedor">Proveedor / Delivery</option>
                <option value="Servicio">Servicio STS / Mantenimiento</option>
                <option value="Propietario">Propietario</option>
                <option value="Renta Vacacional">Renta Vacacional</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Condominio
              </label>
              <select
                value={condoName}
                onChange={(e) => setCondoName(e.target.value)}
                className="w-full px-3 py-2 bg-[#121316] border border-[#2b2e37] rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
              >
                <option value="Condominio Foresta">Condominio Foresta</option>
                <option value="Condominio Sunset Hills">Condominio Sunset Hills</option>
                <option value="Hotel Pumilio">Hotel Pumilio</option>
                <option value="Condominio Cima Real">Condominio Cima Real</option>
                <option value="Bosque Real Residencial">Bosque Real Residencial</option>
                <option value="Vistas del Sol">Vistas del Sol</option>
                <option value="Trejos Montealegre Condos">Trejos Montealegre Condos</option>
                <option value="Lindora Park Executive">Lindora Park Executive</option>
                <option value="Avalon Flats">Avalon Flats</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Casa / Unidad
              </label>
              <input
                type="text"
                required
                value={unitNumber}
                onChange={(e) => setUnitNumber(e.target.value)}
                placeholder="Casa #42 o Suite 10"
                className="w-full px-3 py-2 bg-[#121316] border border-[#2b2e37] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Placa Vehicular
              </label>
              <input
                type="text"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
                placeholder="CL-123456 o Peatonal"
                className="w-full px-3 py-2 bg-[#121316] border border-[#2b2e37] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono uppercase"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Modelo / Color
              </label>
              <input
                type="text"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                placeholder="Toyota RAV4 Blanco"
                className="w-full px-3 py-2 bg-[#121316] border border-[#2b2e37] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">
              Teléfono de Contacto
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+506 8800-0000"
              className="w-full px-3 py-2 bg-[#121316] border border-[#2b2e37] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">
              Observaciones de Ingreso
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Motivo de visita, acompañantes o notas de seguridad..."
              className="w-full px-3 py-2 bg-[#121316] border border-[#2b2e37] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#20222a] text-slate-300 text-xs font-semibold hover:bg-[#282b35] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-950/50 flex items-center justify-center gap-1.5 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Guardar y Registrar Acceso</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
