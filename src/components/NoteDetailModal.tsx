import React from 'react';
import {
  ChevronLeft,
  Bookmark,
  Copy,
  User,
  Clock,
  CheckCircle2,
  Trash2,
  Building2,
  AlertTriangle,
  Check,
  Share2
} from 'lucide-react';
import { NoteCardItem } from './NotesPage';

interface Props {
  note: NoteCardItem | null;
  onClose: () => void;
  onToggleBookmark: (id: string) => void;
  onToggleRead: (id: string, currentStatus: boolean) => void;
  onDeleteNote: (id: string, title?: string) => void;
  onShowToast: (msg: string) => void;
}

export const NoteDetailModal: React.FC<Props> = ({
  note,
  onClose,
  onToggleBookmark,
  onToggleRead,
  onDeleteNote,
  onShowToast
}) => {
  if (!note) return null;

  const handleCopy = async () => {
    const text = `📝 *NOTA DE TURNO STS*\n🏢 Condominio: ${note.category}\n⚠️ Prioridad: ${note.priority.toUpperCase()}\n👤 Autor: ${note.author} (${note.timestamp})\n─────────────────\n${note.content}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        onShowToast('¡Nota copiada al portapapeles!');
      } else {
        onShowToast('Texto copiado');
      }
    } catch {
      onShowToast('Texto copiado');
    }
  };

  const isHigh = note.priority === 'alta';
  const isMedium = note.priority === 'media';

  return (
    <div className="absolute inset-0 z-50 bg-[#0c0d10] flex flex-col animate-in fade-in slide-in-from-right-4 duration-200 overflow-hidden">
      {/* 1. Top Navigation Bar: Back button to Notas + Quick Actions */}
      <div className="px-3.5 py-2.5 border-b border-[#20222a] bg-[#121316] flex items-center justify-between shrink-0 shadow-md">
        {/* Back button returning to Notes Page */}
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-[#1c1e26] hover:bg-[#252834] border border-[#2d3140] px-3 py-1.5 rounded-xl transition-all active:scale-95 cursor-pointer shadow-sm"
          title="Volver a la página de notas"
        >
          <ChevronLeft className="w-4 h-4 text-white stroke-[2.4]" />
          <span>Volver a Notas</span>
        </button>

        {/* Right actions: Bookmark, Copy, Delete */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onToggleBookmark(note.id)}
            className={`p-2 rounded-xl border transition-all cursor-pointer active:scale-95 ${
              note.isBookmarked
                ? 'bg-amber-400/20 text-amber-400 border-amber-400/40 shadow-sm shadow-amber-950/40'
                : 'bg-[#181a20] text-slate-400 hover:text-white border-[#272a34]'
            }`}
            title={note.isBookmarked ? 'Guardada' : 'Guardar nota'}
          >
            <Bookmark
              className={`w-4 h-4 ${note.isBookmarked ? 'fill-amber-400' : ''}`}
            />
          </button>

          <button
            onClick={handleCopy}
            className="p-2 rounded-xl bg-[#181a20] border border-[#272a34] text-slate-300 hover:text-white transition-all active:scale-95 cursor-pointer"
            title="Copiar nota"
          >
            <Copy className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDeleteNote(note.id, note.title)}
            className="p-2 rounded-xl bg-[#181a20] border border-[#272a34] text-slate-400 hover:text-red-400 transition-all active:scale-95 cursor-pointer"
            title="Eliminar nota"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Full-Screen Note Canvas */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 overscroll-contain touch-pan-y scrollbar-thin">
        {/* Badges: Category & Priority */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#18191f] border border-[#2b2d38] text-slate-200 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            {note.category}
          </span>

          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1 ${
              isHigh
                ? 'bg-red-950/60 border-red-500/40 text-red-400'
                : isMedium
                ? 'bg-amber-950/60 border-amber-500/40 text-amber-400'
                : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
            }`}
          >
            {isHigh && <AlertTriangle className="w-3.5 h-3.5" />}
            Prioridad {note.priority.toUpperCase()}
          </span>

          {note.isBookmarked && (
            <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center gap-1">
              <Bookmark className="w-3 h-3 fill-amber-400" />
              Guardada
            </span>
          )}

          {note.readByFabian ? (
            <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-1">
              <Check className="w-3 h-3" />
              Leída
            </span>
          ) : (
            <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300">
              Pendiente
            </span>
          )}
        </div>

        {/* Note Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
          {note.title}
        </h1>

        {/* Author & Timestamp Bar */}
        <div className="flex items-center gap-3 text-xs text-slate-400 py-1 border-y border-[#1e2028]">
          <span className="flex items-center gap-1.5 font-medium text-slate-200">
            <User className="w-3.5 h-3.5 text-slate-400" />
            {note.author}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            {note.timestamp}
          </span>
        </div>

        {/* Note Content - Clean expansive sheet styling */}
        <div className="bg-[#14151a] border border-[#242733] rounded-2xl p-4 sm:p-5 shadow-lg space-y-3 min-h-[180px]">
          <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line font-normal">
            {note.content}
          </p>
        </div>

        {/* Action Controls at Bottom */}
        <div className="pt-2 space-y-2.5">
          <button
            onClick={() => onToggleRead(note.id, note.readByFabian)}
            className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] cursor-pointer ${
              note.readByFabian
                ? 'bg-[#1e2028] text-slate-300 hover:bg-[#282a35] border border-[#2e313d]'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/60'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {note.readByFabian
                ? 'Marcar como Pendiente'
                : 'Marcar como Leída / Atendida'}
            </span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCopy}
              className="py-2.5 px-3 rounded-xl bg-[#18191f] hover:bg-[#20222a] border border-[#272a34] text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copiar Texto</span>
            </button>

            <button
              onClick={onClose}
              className="py-2.5 px-3 rounded-xl bg-[#18191f] hover:bg-[#20222a] border border-[#272a34] text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Volver a Notas</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
