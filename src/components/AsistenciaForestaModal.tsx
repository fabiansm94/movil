import React, { useState } from 'react';
import {
  X,
  UserCheck,
  Clock,
  Plus,
  Camera,
  Pencil,
  Trash2,
  Check
} from 'lucide-react';

interface AttendanceRecord {
  id: string;
  name: string;
  entryTime: string;
  role: string;
  date: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

const INITIAL_RECORDS: AttendanceRecord[] = [
  {
    id: 'att-1',
    name: 'Heidy',
    entryTime: '08:50',
    role: 'Limpieza',
    date: '19/10/2026'
  },
  {
    id: 'att-2',
    name: 'Carlos Méndez',
    entryTime: '07:00',
    role: 'Mantenimiento General',
    date: '19/10/2026'
  },
  {
    id: 'att-3',
    name: 'Don Rigoberto',
    entryTime: '07:30',
    role: 'Jardinería y Áreas Comunes',
    date: '19/10/2026'
  }
];

export const AsistenciaForestaModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [records, setRecords] = useState<AttendanceRecord[]>(INITIAL_RECORDS);
  const [name, setName] = useState('');
  const [entryTime, setEntryTime] = useState('');
  const [role, setRole] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const todayFormatted = new Date().toLocaleDateString('es-CR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      onShowToast('Por favor ingresa el nombre');
      return;
    }

    const currentTime =
      entryTime.trim() ||
      new Date().toLocaleTimeString('es-CR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });

    const todayDate = new Date().toLocaleDateString('es-CR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    if (editingId) {
      setRecords((prev) =>
        prev.map((r) =>
          r.id === editingId
            ? {
                ...r,
                name: name.trim(),
                entryTime: currentTime,
                role: role.trim() || 'Staff'
              }
            : r
        )
      );
      setEditingId(null);
      onShowToast(`Registro de ${name} actualizado`);
    } else {
      const newRecord: AttendanceRecord = {
        id: `att-${Date.now()}`,
        name: name.trim(),
        entryTime: currentTime,
        role: role.trim() || 'Staff General',
        date: todayDate
      };
      setRecords([newRecord, ...records]);
      onShowToast(`Asistencia guardada para ${name}`);
    }

    setName('');
    setEntryTime('');
    setRole('');
  };

  const handleEdit = (record: AttendanceRecord) => {
    setEditingId(record.id);
    setName(record.name);
    setEntryTime(record.entryTime);
    setRole(record.role);
    onShowToast(`Editando asistencia de ${record.name}`);
  };

  const handleDelete = (id: string, recordName: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setName('');
      setEntryTime('');
      setRole('');
    }
    onShowToast(`Registro de ${recordName} eliminado`);
  };

  const handleCaptureScreenshot = () => {
    try {
      const todayDate = new Date().toLocaleDateString('es-CR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      const lines = records.map(
        (r, i) => `${i + 1}. ${r.name} | Entrada: ${r.entryTime} | Cargo: ${r.role}`
      );
      const text = `📋 ASISTENCIA FORESTA (${todayDate})\n\n${lines.join('\n')}\n\nTotal presentes: ${records.length}`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      }
    } catch {
      // ignore
    }
    onShowToast('📋 Reporte de asistencia copiado al portapapeles');
  };

  const handleQuickAdd = () => {
    const inputElement = document.getElementById('asistencia-name-input');
    if (inputElement) inputElement.focus();
    onShowToast('Ingresa los datos para registrar asistencia');
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

        {/* Header - Matching screenshot */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-[#20222a] shrink-0">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs sm:text-sm font-semibold text-white">
              Asistencia Foresta
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

        {/* Scrollable container */}
        <div className="flex-1 overflow-y-auto overscroll-contain touch-pan-y p-3.5 sm:p-4 space-y-4 scrollbar-thin">
          {/* Main Title & Subtitle */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Asistencia
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Registro de asistencia del staff administrativo
            </p>
          </div>

          {/* Card 1: Registrar Asistencia Form */}
          <div className="bg-[#16171d] border border-[#252834] rounded-2xl p-4 space-y-3.5 shadow-md">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#f87171]" />
              <h2 className="text-xs sm:text-sm font-bold text-white">
                {editingId ? 'Editar Asistencia' : 'Registrar Asistencia'}
              </h2>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Field: Nombre */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Nombre
                  </label>
                  <input
                    id="asistencia-name-input"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre completo"
                    className="w-full bg-[#0d0e12] border border-[#2a2c38] rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d95d5d]"
                  />
                </div>

                {/* Field: Hora de Entrada */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Hora de Entrada (HH:mm)
                  </label>
                  <input
                    type="text"
                    value={entryTime}
                    onChange={(e) => setEntryTime(e.target.value)}
                    placeholder="Ej: 14:30"
                    className="w-full bg-[#0d0e12] border border-[#2a2c38] rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d95d5d]"
                  />
                </div>

                {/* Field: Cargo */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Cargo
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Ej: Mantenimiento"
                    className="w-full bg-[#0d0e12] border border-[#2a2c38] rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d95d5d]"
                  />
                </div>
              </div>

              {/* Submit button */}
              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#d95d5d] hover:bg-[#c94f4f] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 cursor-pointer text-center"
                >
                  {editingId ? 'Actualizar registro' : 'Guardar registro'}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setName('');
                      setEntryTime('');
                      setRole('');
                    }}
                    className="py-2.5 px-3 rounded-xl bg-[#23262e] border border-[#323642] text-xs text-slate-300 hover:text-white cursor-pointer"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Section 2: Historial de Asistencia */}
          <div className="space-y-2 pt-1">
            <h2 className="text-xs sm:text-sm font-bold text-white tracking-wide">
              Historial de Asistencia
            </h2>

            <div className="bg-[#16171d] border border-[#252834] rounded-2xl overflow-hidden shadow-md">
              {/* Date and Action Buttons Bar */}
              <div className="px-3.5 py-3 border-b border-[#252834] flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-bold text-[#f87171]">
                  {todayFormatted || '19/10/2026'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleQuickAdd}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#0d0e12] border border-[#2e313e] text-[11px] font-medium text-slate-200 hover:border-slate-500 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-slate-300" />
                    <span>Añadir asistencia</span>
                  </button>

                  <button
                    onClick={handleCaptureScreenshot}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0d0e12] border border-[#2e313e] text-[11px] font-medium text-slate-200 hover:border-slate-500 transition-colors cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 text-slate-300" />
                    <span>Capturar Screenshot</span>
                  </button>
                </div>
              </div>

              {/* Attendance Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#22242f] text-[11px] font-semibold text-slate-400">
                      <th className="py-2.5 px-3.5">Nombre</th>
                      <th className="py-2.5 px-3">Hora de Entrada</th>
                      <th className="py-2.5 px-3">Cargo</th>
                      <th className="py-2.5 px-3 text-right">Acciones</th>
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
                        <td className="py-2.5 px-3 text-slate-300 font-mono">
                          {rec.entryTime}
                        </td>
                        <td className="py-2.5 px-3 text-slate-300">
                          {rec.role}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <div className="flex items-center justify-end gap-2.5">
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
                          colSpan={4}
                          className="py-6 text-center text-xs text-slate-500"
                        >
                          No hay registros de asistencia para esta fecha.
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
    </div>
  );
};
