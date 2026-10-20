import React, { useState } from 'react';
import { Phone, MapPin, Plus, Copy, Check, ShieldAlert, X, Siren } from 'lucide-react';
import { EmergencyContact } from '../types';

interface Props {
  contacts: EmergencyContact[];
  onAddContact: (contact: EmergencyContact) => void;
  isOpen?: boolean;
  onClose?: () => void;
  embedded?: boolean;
  isFramed?: boolean;
}

export const PoliceEmergencySheet: React.FC<Props> = ({
  contacts,
  onAddContact,
  isOpen = false,
  onClose,
  embedded = false,
  isFramed = false
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const handleCopy = (phone: string, id: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;
    onAddContact({
      id: `pol-${Date.now()}`,
      name: newName,
      phone: newPhone,
      location: newLocation || 'San José, Costa Rica',
      type: 'policia'
    });
    setNewName('');
    setNewPhone('');
    setNewLocation('');
    setShowAddModal(false);
  };

  const content = (
    <div className="bg-[#18191d] rounded-2xl border border-[#272a32] p-4 shadow-md space-y-3">
      {/* Header matching screenshot: Policía municipal with + button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-400">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white tracking-tight uppercase">
              Policía municipal
            </h3>
            <span className="text-[10px] text-slate-400">Líneas directas de emergencia</span>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="w-7 h-7 rounded-lg bg-[#22252e] hover:bg-[#2c303c] border border-[#313543] flex items-center justify-center text-slate-200 active:scale-95 transition-all"
          title="Agregar número"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Speed Dial Emergency List */}
      <div className="space-y-2">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="p-2.5 sm:p-3 rounded-xl bg-[#131418] border border-[#252830] hover:border-[#383c48] flex items-center justify-between gap-2 transition-colors"
          >
            <div className="space-y-0.5 min-w-0 flex-1">
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-red-400 hover:text-red-300 font-mono tracking-wide"
                title="Llamar directamente"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{contact.phone}</span>
              </a>

              <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-400 truncate">
                <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                <span className="truncate">{contact.location}</span>
                {contact.badge && (
                  <>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-500 truncate">{contact.name}</span>
                  </>
                )}
              </div>
            </div>

            {/* Quick Actions (Call / Copy) */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => handleCopy(contact.phone, contact.id)}
                className="p-1.5 sm:p-2 rounded-lg bg-[#1f2127] text-slate-300 hover:text-white border border-[#2d3039] active:scale-95 transition-all text-xs cursor-pointer"
                title="Copiar número"
              >
                {copiedId === contact.id ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>

              <a
                href={`tel:${contact.phone}`}
                className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md shadow-red-950/40 active:scale-95 transition-all flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Llamar</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Fast 911 Hotline banner */}
      <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-red-950/80 via-red-900/40 to-slate-900 border border-red-700/50 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-md animate-pulse shrink-0">
            <Siren className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-xs font-bold text-white block truncate">Central Nacional 9-1-1</span>
            <span className="text-[10px] text-red-200 block truncate">Bomberos, Cruz Roja, Fuerza Pública</span>
          </div>
        </div>

        <a
          href="tel:911"
          className="px-3 py-1.5 rounded-lg bg-white text-red-700 font-extrabold text-xs shadow hover:bg-slate-100 active:scale-95 transition-all shrink-0"
        >
          SOS 911
        </a>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div
          onClick={() => setShowAddModal(false)}
          className={`${isFramed ? 'absolute' : 'fixed'} inset-0 z-50 flex items-center justify-center bg-black/80 p-3 animate-in fade-in`}
        >
          <form
            onSubmit={handleSave}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xs bg-[#1b1d24] border border-[#2f3340] rounded-2xl p-4 space-y-3 shadow-2xl animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between border-b border-[#292c37] pb-2">
              <h4 className="text-xs font-bold text-white">Nuevo Contacto de Seguridad</h4>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="text-[11px] text-slate-300 block mb-1">Nombre / Dependencia</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Ej. Policía de Tránsito"
                className="w-full px-3 py-2 bg-[#121316] border border-[#2b2e37] rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-300 block mb-1">Número Telefónico</label>
              <input
                type="tel"
                required
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="Ej. 2222-0000"
                className="w-full px-3 py-2 bg-[#121316] border border-[#2b2e37] rounded-lg text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-300 block mb-1">Sector / Cantón</label>
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="Ej. San Rafael, Escazú"
                className="w-full px-3 py-2 bg-[#121316] border border-[#2b2e37] rounded-lg text-xs text-white"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 rounded-lg bg-[#242630] text-slate-300 text-xs"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );

  if (embedded) return content;

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className={`${isFramed ? 'absolute' : 'fixed'} inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm p-0 animate-in fade-in`}
    >
      <div
        className="w-full bg-[#18191d] border-t border-[#2f323c] rounded-t-3xl max-h-[90%] overflow-y-auto shadow-2xl p-4 animate-in slide-in-from-bottom-4 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 bg-slate-600/50 rounded-full mx-auto mb-3 shrink-0" />
        <div className="flex justify-between items-center pb-2 mb-2 border-b border-[#272a33]">
          <h3 className="text-sm font-bold text-white">Directorio de Emergencias</h3>
          {onClose && (
            <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {content}
      </div>
    </div>
  );
};
