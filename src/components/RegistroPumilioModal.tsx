import React, { useState } from 'react';
import {
  X,
  Hotel,
  Clock,
  Calendar,
  UserPlus,
  Camera,
  Trash2,
  Pencil
} from 'lucide-react';

export interface PumilioRecord {
  id: string;
  name: string;
  room: string;
  role: string;
  date: string;
  entryTime: string;
  exitTime: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

const INITIAL_RECORDS: PumilioRecord[] = [
  {
    id: 'pumilio-1',
    name: 'Adrian Calderon',
    room: 'Pumilio',
    role: 'Recepcionista',
    date: '18/10/2026',
    entryTime: '-',
    exitTime: '21:56'
  },
  {
    id: 'pumilio-2',
    name: 'Maripaz Sequeira',
    room: '12',
    role: 'Huésped',
    date: '19/10/2026',
    entryTime: '-',
    exitTime: '03:57'
  },
  {
    id: 'pumilio-3',
    name: 'Vicelda',
    room: 'Pumilio',
    role: 'Mucama/Cocina',
    date: '19/10/2026',
    entryTime: '05:29',
    exitTime: '-'
  }
];

export const RegistroPumilioModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [records, setRecords] = useState<PumilioRecord[]>(INITIAL_RECORDS);

  // Form states
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [role, setRole] = useState('');
  const [isManualDate, setIsManualDate] = useState(false);

  const todayFormatted = new Date().toLocaleDateString('es-CR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const [date, setDate] = useState(todayFormatted);
  const [entryTime, setEntryTime] = useState('');
  const [exitTime, setExitTime] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      onShowToast('Por favor ingresa el nombre');
      return;
    }
    if (!room.trim()) {
      onShowToast('Por favor ingresa el número o nombre de habitación');
      return;
    }
    if (!role.trim()) {
      onShowToast('Por favor ingresa el cargo o tipo de usuario');
      return;
    }

    const recordDate = isManualDate && date.trim() ? date.trim() : todayFormatted;
    const finalEntry = entryTime.trim() || '-';
    const finalExit = exitTime.trim() || '-';

    if (editingId) {
      setRecords((prev) =>
        prev.map((r) =>
          r.id === editingId
            ? {
                ...r,
                name: name.trim(),
                room: room.trim(),
                role: role.trim(),
                date: recordDate,
                entryTime: finalEntry,
                exitTime: finalExit
              }
            : r
        )
      );
      setEditingId(null);
      onShowToast(`Registro de ${name} actualizado`);
    } else {
      const newRec: PumilioRecord = {
        id: `pumilio-${Date.now()}`,
        name: name.trim(),
        room: room.trim(),
        role: role.trim(),
        date: recordDate,
        entryTime: finalEntry,
        exitTime: finalExit
      };
      setRecords((prev) => [newRec, ...prev]);
      onShowToast(`Registro guardado para ${name}`);
    }

    // Reset form
    setName('');
    setRoom('');
    setRole('');
    setEntryTime('');
    setExitTime('');
  };

  const handleEdit = (rec: PumilioRecord) => {
    setEditingId(rec.id);
    setName(rec.name);
    setRoom(rec.room);
    setRole(rec.role);
    setDate(rec.date);
    setIsManualDate(true);
    setEntryTime(rec.entryTime === '-' ? '' : rec.entryTime);
    setExitTime(rec.exitTime === '-' ? '' : rec.exitTime);

    // Scroll to form smoothly
    const inputElement = document.getElementById('pumilio-name-input');
    if (inputElement) {
      inputElement.focus();
    }
  };

  const handleDelete = (id: string, recordName: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setName('');
      setRoom('');
      setRole('');
      setEntryTime('');
      setExitTime('');
    }
    onShowToast(`Registro de ${recordName} eliminado`);
  };

  const handleClearTurn = () => {
    if (records.length === 0) return;
    setRecords([]);
    onShowToast('Turno de Hotel Pumilio reiniciado');
  };

  const handleCaptureScreenshot = async () => {
    const reportText = [
      `🏨 *REGISTRO DIARIO - HOTEL PUMILIO*`,
      `📅 *Fecha Turno:* ${todayFormatted} (Turnos de 10:00pm a 8:00am)`,
      `───────────────────────────────`,
      ...records.map(
        (r, i) =>
          `${i + 1}. *${r.name}* | Hab: ${r.room} | ${r.role} | Fecha: ${r.date} | Entrada: ${r.entryTime} | Salida: ${r.exitTime}`
      ),
      `───────────────────────────────`,
      `Total Registros: ${records.length} | Sistema Seguridad STS`
    ].join('\n');

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(reportText);
        onShowToast('¡Reporte copiado al portapapeles listo para compartir!');
      } else {
        onShowToast('Captura generada para el turno de Hotel Pumilio');
      }
    } catch {
      onShowToast('Captura generada del turno de Hotel Pumilio');
    }
  };

  const handleQuickAdd = () => {
    const inputElement = document.getElementById('pumilio-name-input');
    if (inputElement) inputElement.focus();
    onShowToast('Ingresa los datos en Nuevo Registro');
  };

  return (
    <div
      onClick={onClose}
      className="absolute inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm p-0 animate-in fade-in overflow-hidden"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full bg-[#111216] border-t border-[#262833] rounded-t-3xl h-[94%] max-h-[94%] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-200"
      >
        {/* Handle bar */}
        <div className="w-12 h-1.5 bg-slate-600/50 rounded-full mx-auto mt-2.5 mb-1 shrink-0" />

        {/* Top Header - Matching user screenshot: Icon + "Registro Hotel Pumilio" + Close X */}
        <div className="px-4 py-2.5 flex items-center justify-between border-b border-[#20222a] shrink-0">
          <div className="flex items-center gap-2">
            <Hotel className="w-4 h-4 text-[#d8b4fe]" />
            <span className="text-xs sm:text-sm font-semibold text-white">
              Registro Hotel Pumilio
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
            title="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto overscroll-contain touch-pan-y p-3.5 sm:p-4 space-y-4 scrollbar-thin">
          {/* Main Title Section - Matching user screenshot */}
          <div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-[#f87171]" />
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Registro Diario Hotel
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1 pl-7">
              Turnos de 10:00pm a 8:00am
            </p>
          </div>

          {/* Card 1: Nuevo Registro Form - Matching screenshot */}
          <div className="bg-[#16171d] border border-[#252834] rounded-2xl p-4 space-y-3.5 shadow-md">
            <h2 className="text-sm sm:text-base font-bold text-white">
              {editingId ? 'Editar Registro' : 'Nuevo Registro'}
            </h2>

            <form onSubmit={handleSave} className="space-y-3">
              {/* Row 1: Nombre * & Habitación * */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Nombre *
                  </label>
                  <input
                    id="pumilio-name-input"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre completo"
                    className="w-full bg-[#0d0e12] border border-[#d95d5d]/80 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d95d5d] focus:ring-1 focus:ring-[#d95d5d]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Habitación *
                  </label>
                  <input
                    type="text"
                    required
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    placeholder="Número de habitación"
                    className="w-full bg-[#0d0e12] border border-[#2a2c38] rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d95d5d]"
                  />
                </div>
              </div>

              {/* Row 2: Cargo * & Fecha (DD/MM/YYYY) with Manual Checkbox */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Cargo *
                  </label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Ej: Recepcionista, Limpieza, etc."
                    className="w-full bg-[#0d0e12] border border-[#2a2c38] rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d95d5d]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-semibold text-slate-300">
                      Fecha (DD/MM/YYYY)
                    </label>
                    <label className="flex items-center gap-1.5 text-[10px] text-slate-400 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isManualDate}
                        onChange={(e) => setIsManualDate(e.target.checked)}
                        className="rounded bg-[#0d0e12] border-[#313544] text-[#d95d5d] focus:ring-0 w-3 h-3 cursor-pointer"
                      />
                      <span>Manual</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={isManualDate ? date : todayFormatted}
                    disabled={!isManualDate}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="DD/MM/YYYY"
                    className={`w-full bg-[#0d0e12] border rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none ${
                      isManualDate
                        ? 'border-[#2a2c38] focus:border-[#d95d5d]'
                        : 'border-[#20222b] text-slate-400 cursor-not-allowed opacity-90'
                    }`}
                  />
                </div>
              </div>

              {/* Row 3: Hora Entrada (HH:mm) & Hora Salida (HH:mm) */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Hora Entrada (HH:mm)
                  </label>
                  <input
                    type="text"
                    value={entryTime}
                    onChange={(e) => setEntryTime(e.target.value)}
                    placeholder="Ej: 22:30"
                    className="w-full bg-[#0d0e12] border border-[#2a2c38] rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d95d5d]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Hora Salida (HH:mm)
                  </label>
                  <input
                    type="text"
                    value={exitTime}
                    onChange={(e) => setExitTime(e.target.value)}
                    placeholder="Ej: 08:00"
                    className="w-full bg-[#0d0e12] border border-[#2a2c38] rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d95d5d]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#d95d5d] hover:bg-[#c94f4f] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 cursor-pointer text-center"
                >
                  {editingId ? 'Actualizar' : 'Registrar'}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setName('');
                      setRoom('');
                      setRole('');
                      setEntryTime('');
                      setExitTime('');
                    }}
                    className="py-2.5 px-3.5 rounded-xl bg-[#22242f] hover:bg-[#2b2d3b] text-slate-300 text-xs font-semibold cursor-pointer"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Card 2: Turno History & Table - Matching user screenshot */}
          <div className="bg-[#16171d] border border-[#252834] rounded-2xl overflow-hidden shadow-md">
            {/* Header: Calendar + Date + Action Buttons */}
            <div className="p-3.5 flex flex-wrap items-center justify-between gap-2 border-b border-[#22242f] bg-[#14151b]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#f87171]" />
                <span className="text-xs sm:text-sm font-bold text-white">
                  Turno - {todayFormatted}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleQuickAdd}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0d0e12] border border-[#2e313e] text-[11px] font-medium text-slate-200 hover:border-slate-500 transition-colors cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5 text-slate-300" />
                  <span>Añadir</span>
                </button>

                <button
                  onClick={handleCaptureScreenshot}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0d0e12] border border-[#2e313e] text-[11px] font-medium text-slate-200 hover:border-slate-500 transition-colors cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5 text-slate-300" />
                  <span>Screenshot</span>
                </button>

                <button
                  onClick={handleClearTurn}
                  className="p-1.5 rounded-lg bg-[#0d0e12] border border-[#2e313e] text-[#f87171] hover:text-red-400 hover:border-red-900/50 transition-colors cursor-pointer"
                  title="Reiniciar lista del turno"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Table Container with horizontal scroll for mobile */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs min-w-[500px]">
                <thead>
                  <tr className="border-b border-[#22242f] text-[11px] font-semibold text-slate-400">
                    <th className="py-2.5 px-3.5">Nombre</th>
                    <th className="py-2.5 px-3">Hab.</th>
                    <th className="py-2.5 px-3">Cargo</th>
                    <th className="py-2.5 px-3">Fecha</th>
                    <th className="py-2.5 px-3">Entrada</th>
                    <th className="py-2.5 px-3">Salida</th>
                    <th className="py-2.5 px-3 text-right">Acc.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#20222d]">
                  {records.map((rec) => (
                    <tr
                      key={rec.id}
                      className="hover:bg-[#1b1c24] transition-colors"
                    >
                      <td className="py-2.5 px-3.5 font-medium text-slate-200">
                        {rec.name}
                      </td>
                      <td className="py-2.5 px-3 text-slate-300">
                        {rec.room}
                      </td>
                      <td className="py-2.5 px-3 text-slate-300">
                        {rec.role}
                      </td>
                      <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">
                        {rec.date}
                      </td>
                      <td className="py-2.5 px-3 text-slate-300 font-mono">
                        {rec.entryTime}
                      </td>
                      <td className="py-2.5 px-3 text-slate-300 font-mono">
                        {rec.exitTime}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(rec)}
                            className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
                            title="Editar"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(rec.id, rec.name)}
                            className="text-[#f87171] hover:text-red-400 transition-colors cursor-pointer p-1"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {records.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-6 text-center text-xs text-slate-500"
                      >
                        No hay registros para este turno.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
