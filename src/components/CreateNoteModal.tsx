import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { NoteCardItem } from './NotesPage';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newNote: NoteCardItem) => void;
  onShowToast: (msg: string) => void;
}

export const CreateNoteModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  onShowToast
}) => {
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('General');
  const [newPriority, setNewPriority] = useState<'alta' | 'media' | 'baja'>('media');

  const categories = ['General', 'Foresta', 'Sunset Hills', 'Cima Real', 'Hotel Pumilio'];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) {
      onShowToast('Escribe el contenido de la nota');
      return;
    }

    const created: NoteCardItem = {
      id: `note-${Date.now()}`,
      content: newContent.trim(),
      priority: newPriority,
      author: 'Fabian (Supervisor)',
      timestamp: 'Hoy, ' + new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit', hour12: true }),
      readByFabian: true,
      category: newCategory,
      isBookmarked: false,
      code: `NOT-${Math.floor(Math.random() * 90 + 10)}`
    };

    onSave(created);
    setNewContent('');
    setNewCategory('General');
    setNewPriority('media');
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="absolute inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm p-0 animate-in fade-in overflow-hidden"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full bg-[#16171b] border-t border-[#2c303c] rounded-t-3xl max-h-[90%] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-200"
      >
        <div className="w-10 h-1 bg-slate-600/50 rounded-full mx-auto mt-2.5 mb-1 shrink-0" />

        <div className="px-4 py-3 border-b border-[#242732] flex items-center justify-between shrink-0">
          <span className="text-sm font-bold text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Nueva Nota de Turno
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3.5 overflow-y-auto">

          <div>
            <label className="text-[11px] font-semibold text-slate-300 block mb-1">
              Contenido de la Consigna *
            </label>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={3}
              placeholder="Escribe los detalles, número de casa, placas, horario o instrucciones..."
              className="w-full bg-[#111215] border border-[#2b2e38] focus:border-red-400 focus:outline-none rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 resize-none leading-relaxed"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Condominio / Área
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-[#111215] border border-[#2b2e38] text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-red-400"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Prioridad
              </label>
              <div className="grid grid-cols-3 gap-1">
                {(['baja', 'media', 'alta'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setNewPriority(p)}
                    className={`py-1.5 text-[10px] font-bold rounded-lg border transition-all capitalize ${
                      newPriority === p
                        ? p === 'alta'
                          ? 'bg-red-950/80 border-red-500 text-red-300'
                          : p === 'media'
                          ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                          : 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                        : 'bg-[#111215] border-[#262832] text-slate-400'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md transition-all active:scale-98 cursor-pointer"
            >
              Guardar Nota
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-[#20222a] border border-[#2f3340] text-xs text-slate-300 hover:text-white"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
