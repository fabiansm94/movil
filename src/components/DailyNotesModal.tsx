import React, { useState } from 'react';
import { BookOpen, X, Plus, AlertCircle, CheckCircle2, User, Clock, Check } from 'lucide-react';
import { DAILY_NOTES } from '../data/mockData';
import { DailyNote } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isFramed?: boolean;
}

export const DailyNotesModal: React.FC<Props> = ({ isOpen, onClose, isFramed = false }) => {
  const [notes, setNotes] = useState<DailyNote[]>(DAILY_NOTES);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newPriority, setNewPriority] = useState<'alta' | 'media' | 'baja'>('media');

  if (!isOpen) return null;

  const handleToggleRead = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, readByFabian: !n.readByFabian } : n))
    );
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newNote: DailyNote = {
      id: `note-${Date.now()}`,
      title: newTitle.trim(),
      content: newContent.trim(),
      priority: newPriority,
      author: 'Fabian (Supervisor)',
      timestamp: 'Justo ahora',
      readByFabian: true
    };

    setNotes([newNote, ...notes]);
    setNewTitle('');
    setNewContent('');
    setShowAddForm(false);
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
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">
                Notas y Consignas Diarias
              </h2>
              <span className="text-[11px] text-slate-400">
                Bitácora de turnos y protocolos
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="p-1.5 px-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1 shadow-sm cursor-pointer"
              title="Nueva nota"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Nota</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#23262e] border border-[#323642] flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-3 flex-1 overflow-y-auto overscroll-contain touch-pan-y scrollbar-thin">
          {showAddForm && (
            <form
              onSubmit={handleAddNote}
              className="p-3.5 rounded-xl bg-[#121316] border border-[#2b2e37] space-y-3 animate-in fade-in"
            >
              <h4 className="text-xs font-bold text-white">Agregar Consigna de Turno</h4>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Título de la nota..."
                className="w-full px-3 py-2 bg-[#1a1b22] border border-[#303340] rounded-lg text-xs text-white"
              />
              <textarea
                required
                rows={3}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Instrucciones para el relevo o garita..."
                className="w-full px-3 py-2 bg-[#1a1b22] border border-[#303340] rounded-lg text-xs text-white"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span>Prioridad:</span>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="bg-[#1a1b22] border border-[#303340] rounded px-2 py-1 text-xs text-white"
                  >
                    <option value="alta">Alta</option>
                    <option value="media">Media</option>
                    <option value="baja">Baja</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-3 py-1.5 rounded-lg bg-[#20222a] text-slate-300 text-xs"
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
              </div>
            </form>
          )}

          <div className="space-y-2.5">
            {notes.map((note) => (
              <div
                key={note.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  note.readByFabian
                    ? 'bg-[#131418] border-[#252830]'
                    : 'bg-[#1e1c1f] border-red-500/40 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                        note.priority === 'alta'
                          ? 'bg-red-950 text-red-300 border border-red-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}
                    >
                      {note.priority}
                    </span>
                    <h3 className="text-xs font-bold text-white">{note.title}</h3>
                  </div>

                  <button
                    onClick={() => handleToggleRead(note.id)}
                    className={`text-[10px] flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                      note.readByFabian
                        ? 'text-slate-400 hover:text-slate-200'
                        : 'bg-emerald-950 text-emerald-400 font-bold border border-emerald-800'
                    }`}
                  >
                    {note.readByFabian ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" /> Leída
                      </>
                    ) : (
                      'Marcar leída'
                    )}
                  </button>
                </div>

                <p className="mt-2 text-xs text-slate-300 leading-relaxed">{note.content}</p>

                <div className="mt-3 pt-2 border-t border-[#1e2026] flex items-center justify-between text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" /> {note.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {note.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
