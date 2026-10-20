import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  Search,
  Bookmark,
  Plus,
  User,
  Clock,
  Pencil,
  Check,
  X
} from 'lucide-react';
import { DailyNote } from '../types';

export interface NoteCardItem extends DailyNote {
  category: string;
  isBookmarked: boolean;
  code?: string;
}

export const INITIAL_NOTE_CARDS: NoteCardItem[] = [
  {
    id: 'note-1',
    content: 'De 09:00 a 11:30 el portón vehicular derecho estará en modo manual por cambio de cremallera. Verificar cédulas manualmente a todo ingreso.',
    priority: 'alta',
    author: 'Supervisor STS',
    timestamp: 'Hoy, 06:15 AM',
    readByFabian: true,
    category: 'Foresta',
    isBookmarked: true,
    code: 'SEC-01'
  },
  {
    id: 'note-2',
    content: 'Casa 18 tiene reserva autorizada para 15 invitados entre 14:00 y 20:00. Lista de invitados precargada en garita para acceso fluido.',
    priority: 'media',
    author: 'Administración',
    timestamp: 'Hoy, 07:30 AM',
    readByFabian: false,
    category: 'Sunset Hills',
    isBookmarked: true,
    code: 'EVT-18'
  },
  {
    id: 'note-3',
    content: 'De 07:00 a 10:00 se autoriza el ingreso de 3 camiones de concreto para obra casa 14. Mantener despejado el carril de residentes.',
    priority: 'alta',
    author: 'Oficial Angelo',
    timestamp: 'Hoy, 06:45 AM',
    readByFabian: false,
    category: 'Cima Real',
    isBookmarked: false,
    code: 'OBRA-14'
  },
  {
    id: 'note-4',
    content: 'Se entregaron llaves de cuarto de máquinas y bodega de químicos al encargado Don Carlos de mantenimiento sin incidencias.',
    priority: 'baja',
    author: 'Recepción Pumilio',
    timestamp: 'Ayer, 10:15 PM',
    readByFabian: true,
    category: 'Hotel Pumilio',
    isBookmarked: false,
    code: 'LLV-04'
  },
  {
    id: 'note-5',
    content: 'Recordatorio estricto a garitas: advertir a repartidores y taxis que la velocidad máxima es de 20 km/h en calles internas.',
    priority: 'media',
    author: 'Supervisión STS',
    timestamp: 'Ayer, 03:20 PM',
    readByFabian: true,
    category: 'General',
    isBookmarked: false,
    code: 'TRF-20'
  },
  {
    id: 'note-6',
    content: 'Fumigación programada en áreas verdes perimetrales de 13:00 a 16:00. Cerrar accesos peatonales secundarios.',
    priority: 'baja',
    author: 'Mantenimiento',
    timestamp: 'Ayer, 11:00 AM',
    readByFabian: true,
    category: 'Sunset Hills',
    isBookmarked: false,
    code: 'MNT-02'
  }
];

interface Props {
  notes: NoteCardItem[];
  selectedNote: NoteCardItem | null;
  onSelectNote: (note: NoteCardItem | null) => void;
  onOpenCreateNote: () => void;
  onToggleBookmark: (e: React.MouseEvent, id: string) => void;
  onToggleRead: (id: string, currentStatus: boolean) => void;
  onDeleteNote: (id: string, title?: string) => void;
  onUpdateNote?: (updated: NoteCardItem) => void;
  onShowToast: (msg: string) => void;
  onGoBack?: () => void;
}

export const NotesPage: React.FC<Props> = ({
  notes,
  selectedNote,
  onSelectNote,
  onOpenCreateNote,
  onToggleBookmark,
  onToggleRead: _onToggleRead,
  onDeleteNote: _onDeleteNote,
  onUpdateNote,
  onShowToast: _onShowToast,
  onGoBack
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'todas' | 'guardadas' | 'alta' | 'pendientes'>('todas');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');

  // Edit state when viewing an opened note
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [editCategory, setEditCategory] = useState('General');
  const [editPriority, setEditPriority] = useState<'alta' | 'media' | 'baja'>('media');

  useEffect(() => {
    if (selectedNote) {
      setEditContent(selectedNote.content);
      setEditCategory(selectedNote.category);
      setEditPriority(selectedNote.priority);
      setIsEditing(false);
    }
  }, [selectedNote?.id]);

  const categories = ['General', 'Foresta', 'Sunset Hills', 'Cima Real', 'Hotel Pumilio'];

  const handleSaveEdit = () => {
    if (!selectedNote) return;
    if (!editContent.trim()) {
      _onShowToast('El contenido no puede estar vacío');
      return;
    }
    const updated: NoteCardItem = {
      ...selectedNote,
      content: editContent.trim(),
      category: editCategory,
      priority: editPriority
    };
    if (onUpdateNote) {
      onUpdateNote(updated);
    }
    onSelectNote(updated);
    setIsEditing(false);
    _onShowToast('Nota actualizada correctamente');
  };

  // If a note is selected, show the FULL-PAGE note view while KEEPING the bottom menu visible!
  if (selectedNote) {
    return (
      <div className="space-y-4 animate-in fade-in duration-150 pb-6">
        {/* Top Navigation Bar: Back button + Edit button */}
        <div className="flex items-center justify-between pb-2 border-b border-[#20222a]">
          {/* Back button to return to notes page */}
          <button
            onClick={() => onSelectNote(null)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-[#1c1e26] hover:bg-[#252834] border border-[#2d3140] px-3 py-1.5 rounded-xl transition-all active:scale-95 cursor-pointer shadow-sm"
            title="Volver a la lista de notas"
          >
            <ChevronLeft className="w-4 h-4 text-white stroke-[2.4]" />
            <span>Volver a Notas</span>
          </button>

          {/* Edit button as requested */}
          <button
            onClick={() => {
              if (isEditing) {
                setIsEditing(false);
              } else {
                setEditContent(selectedNote.content);
                setEditCategory(selectedNote.category);
                setEditPriority(selectedNote.priority);
                setIsEditing(true);
              }
            }}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all active:scale-95 cursor-pointer shadow-sm border ${
              isEditing
                ? 'bg-[#20222a] border-[#383d4c] text-slate-300 hover:text-white'
                : 'bg-[#1c1e26] hover:bg-[#252834] border-[#2d3140] text-amber-400 hover:text-amber-300'
            }`}
            title={isEditing ? 'Cancelar edición' : 'Editar esta nota'}
          >
            {isEditing ? (
              <>
                <X className="w-3.5 h-3.5" />
                <span>Cancelar</span>
              </>
            ) : (
              <>
                <Pencil className="w-3.5 h-3.5" />
                <span>Editar</span>
              </>
            )}
          </button>
        </div>

        {isEditing ? (
          /* Inline Note Editor */
          <div className="bg-[#14151a] border border-[#272a36] rounded-2xl p-4 shadow-xl space-y-3.5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-[#20222a]">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Pencil className="w-3.5 h-3.5 text-amber-400" />
                Editar Nota
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {selectedNote.code || 'STS'}
              </span>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Contenido de la Nota *
              </label>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={6}
                placeholder="Escribe el contenido de la nota..."
                className="w-full bg-[#101114] border border-[#2b2e38] focus:border-amber-400 focus:outline-none rounded-xl p-3 text-xs text-white placeholder-slate-500 resize-none leading-relaxed"
                autoFocus
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Condominio
                </label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full bg-[#101114] border border-[#2b2e38] text-white text-xs rounded-xl px-2.5 py-2 focus:outline-none focus:border-amber-400"
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
                      onClick={() => setEditPriority(p)}
                      className={`py-1.5 text-[10px] font-bold rounded-lg border transition-all capitalize ${
                        editPriority === p
                          ? p === 'alta'
                            ? 'bg-red-950/80 border-red-500 text-red-300'
                            : p === 'media'
                            ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                            : 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                          : 'bg-[#101114] border-[#262832] text-slate-400'
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
                onClick={handleSaveEdit}
                className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Guardar Cambios</span>
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="py-2 px-3 rounded-xl bg-[#20222a] border border-[#2f3340] text-xs text-slate-300 hover:text-white"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          /* Normal Note View - NO TITLE as requested */
          <>
            {/* Author & Timestamp Bar */}
            <div className="flex items-center gap-3 text-xs text-slate-400 py-1.5 border-y border-[#1e2028]">
              <span className="flex items-center gap-1.5 font-medium text-slate-200">
                <User className="w-3.5 h-3.5 text-slate-400" />
                {selectedNote.author}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {selectedNote.timestamp}
              </span>
              <span>·</span>
              <span className="text-[11px] text-amber-400/90 font-medium">
                {selectedNote.category}
              </span>
            </div>

            {/* Note Content - Clean expansive sheet styling */}
            <div className="bg-[#14151a] border border-[#242733] rounded-2xl p-4 sm:p-5 shadow-lg space-y-3 min-h-[180px]">
              <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line font-normal">
                {selectedNote.content}
              </p>
            </div>
          </>
        )}
      </div>
    );
  }

  // Otherwise, show the 2-COLUMN GRID matching screenshot composition!
  const filteredNotes = notes.filter((n) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const match =
        (n.title && n.title.toLowerCase().includes(q)) ||
        n.content.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (selectedFilter === 'guardadas' && !n.isBookmarked) return false;
    if (selectedFilter === 'alta' && n.priority !== 'alta') return false;
    if (selectedFilter === 'pendientes' && n.readByFabian) return false;

    if (selectedCategory !== 'todas' && n.category !== selectedCategory) return false;

    return true;
  });

  return (
    <div className="space-y-3 pb-4 relative">
      {/* 1. Header Bar matching screenshot composition: Back Arrow < | Title: Seeds / Notas | Search Icon */}
      <div className="flex items-center justify-between px-1 py-1 relative">
        <button
          onClick={onGoBack}
          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-200 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
          title="Regresar a Inicio"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
        </button>

        <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
          Notas
        </h1>

        <button
          onClick={() => setShowSearchBar(!showSearchBar)}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-95 cursor-pointer ${
            showSearchBar ? 'text-amber-400 bg-white/10' : 'text-slate-200 hover:text-white hover:bg-white/10'
          }`}
          title="Buscar notas"
        >
          <Search className="w-5 h-5 stroke-[2.2]" />
        </button>
      </div>

      {/* 2. Optional Animated Search Bar */}
      {showSearchBar && (
        <div className="relative animate-in fade-in slide-in-from-top-1 duration-150">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar nota por título, contenido o condominio..."
            className="w-full bg-[#18191d] border border-[#2d303b] focus:border-amber-400/70 focus:outline-none rounded-xl pl-10 pr-9 py-2 text-xs text-white placeholder-slate-500 transition-colors"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs p-1"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {/* 3. Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar text-[11px] touch-pan-x -mx-1 px-1">
        {[
          { id: 'todas', label: `Todas (${notes.length})` },
          { id: 'guardadas', label: 'Guardadas' },
          { id: 'alta', label: 'Alta prioridad' },
          { id: 'pendientes', label: 'Pendientes' }
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFilter(f.id as any)}
            className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors shrink-0 ${
              selectedFilter === f.id
                ? 'bg-white text-slate-900 font-bold shadow-sm'
                : 'bg-[#18191d] border border-[#292c36] text-slate-400 hover:text-slate-200'
            }`}
          >
            {f.label}
          </button>
        ))}

        <span className="w-px h-4 bg-[#2b2e38] shrink-0 mx-0.5" />

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(selectedCategory === cat ? 'todas' : cat)}
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap transition-colors shrink-0 ${
              selectedCategory === cat
                ? 'bg-amber-400 text-slate-950 font-bold'
                : 'bg-[#141518] border border-[#242730] text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 4. The 2-COLUMN GRID - Exact Composition from Screenshot */}
      <div className="grid grid-cols-2 gap-3 sm:gap-3.5 pt-0.5">
        {filteredNotes.length === 0 ? (
          <div className="col-span-2 bg-[#18191d] border border-[#272a33] rounded-2xl p-8 text-center space-y-2">
            <Bookmark className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400 font-medium">
              No se encontraron notas con estos filtros
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('todas');
                setSelectedCategory('todas');
              }}
              className="text-[11px] text-amber-400 hover:underline inline-block pt-1 cursor-pointer"
            >
              Ver todas las notas
            </button>
          </div>
        ) : (
          filteredNotes.map((note) => {
            const isHigh = note.priority === 'alta';
            const isMedium = note.priority === 'media';

            return (
              <div
                key={note.id}
                onClick={() => onSelectNote(note)}
                className="rounded-2xl border border-[#2a2d37] bg-[#16171b] overflow-hidden flex flex-col justify-between shadow-md hover:border-slate-400/60 active:scale-[0.98] transition-all cursor-pointer group"
              >
                {/* TOP HALF: Soft-toned canvas area matching the gray block in user screenshot */}
                <div className="relative bg-[#22242e] h-28 sm:h-32 p-2.5 flex flex-col justify-between overflow-hidden">
                  {/* Top row: Category tag + Bookmark icon in small square pill (exact match with user image) */}
                  <div className="flex items-center justify-between w-full z-10">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#16171d]/85 text-slate-200 border border-[#323644] backdrop-blur-sm truncate max-w-[90px]">
                      {note.category}
                    </span>

                    {/* Bookmark Icon inside pill */}
                    <button
                      onClick={(e) => onToggleBookmark(e, note.id)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm ${
                        note.isBookmarked
                          ? 'bg-amber-400/20 text-amber-400 border border-amber-400/40'
                          : 'bg-[#18191d]/80 text-slate-300 hover:text-white border border-[#343846]'
                      }`}
                      title={note.isBookmarked ? 'Guardada' : 'Guardar nota'}
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${note.isBookmarked ? 'fill-amber-400' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Note preview text lines inside the top block */}
                  <div className="mt-1 flex-1 flex flex-col justify-center">
                    <p className="text-[11px] text-slate-300 line-clamp-3 leading-relaxed font-normal">
                      {note.content}
                    </p>
                  </div>

                  {/* Priority indicator bar at the bottom of the top block */}
                  <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1 font-mono">
                      {note.code || 'STS'}
                    </span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isHigh ? 'bg-red-400' : isMedium ? 'bg-amber-400' : 'bg-emerald-400'
                      }`}
                    />
                  </div>
                </div>

                {/* BOTTOM HALF: White/dark contrast card container (Left meta/priority, Right + square button) */}
                <div className="bg-[#121316] p-2 sm:p-2.5 border-t border-[#242732] flex flex-col justify-between">
                  {/* Bottom row: Left metadata & Right (+) square button - Exact match with user image */}
                  <div className="flex items-center justify-between gap-1.5">
                    {/* Left: Priority / Time display */}
                    <div className="min-w-0">
                      <span
                        className={`text-xs font-bold block leading-none ${
                          isHigh
                            ? 'text-red-400'
                            : isMedium
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {isHigh ? 'Alta' : isMedium ? 'Media' : 'Baja'}
                      </span>
                      <span className="text-[10px] text-slate-400 block leading-tight mt-0.5 truncate">
                        {note.timestamp.replace('Hoy, ', '')}
                      </span>
                    </div>

                    {/* Right: Square (+) Action button (Exact match with user screenshot) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectNote(note);
                      }}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#272a34] hover:bg-red-600 text-slate-200 hover:text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer shadow-sm active:scale-95"
                      title="Ver nota completa"
                    >
                      <Plus className="w-4 h-4 stroke-[2.2]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Action Button: "+ Nueva Nota" - Sticky inside the mobile view */}
      <div className="sticky bottom-2 flex justify-end z-20 pointer-events-none pt-2">
        <button
          onClick={onOpenCreateNote}
          className="pointer-events-auto flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-xl shadow-red-950/80 active:scale-95 transition-all cursor-pointer border border-red-400/40"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Nueva Nota</span>
        </button>
      </div>
    </div>
  );
};
