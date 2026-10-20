import React, { useState } from 'react';
import {
  X,
  Filter,
  Plus,
  Bug,
  Lightbulb,
  Package,
  User,
  CheckCircle2,
  ChevronDown,
  RotateCcw,
  Sparkles,
  Send,
  MessageSquare
} from 'lucide-react';
import { SupportTicket } from '../types';
import { INITIAL_TICKETS } from '../data/mockData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isFramed?: boolean;
}

export const SupportTicketsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [typeFilter, setTypeFilter] = useState<string>('todos');
  const [showNewForm, setShowNewForm] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);

  // New ticket form state
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<SupportTicket['type']>('bug');
  const [newPriority, setNewPriority] = useState<SupportTicket['priority']>('Alta');
  const [newDescription, setNewDescription] = useState('');
  const [commentText, setCommentText] = useState('');

  if (!isOpen) return null;

  const filteredTickets = tickets.filter((t) => {
    // Status filter
    if (statusFilter === 'abierto' && !t.status.toLowerCase().includes('abierto')) return false;
    if (statusFilter === 'cerrado' && !t.status.toLowerCase().includes('cerrado')) return false;

    // Type filter
    if (typeFilter !== 'todos' && t.type !== typeFilter) return false;

    return true;
  });

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTicket: SupportTicket = {
      id: Math.max(...tickets.map((t) => t.id), 0) + 1,
      title: newTitle.trim(),
      type: newType,
      status: 'Abierto',
      priority: newPriority,
      author: 'Fabian (Supervisor)',
      date: 'Hoy ' + new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' }),
      description: newDescription.trim() || 'Reporte de soporte generado desde la aplicación móvil de garita.'
    };

    setTickets([newTicket, ...tickets]);
    setNewTitle('');
    setNewDescription('');
    setShowNewForm(false);
    setSelectedTicketId(newTicket.id);
  };

  const toggleStatus = (id: number) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const isCurrentlyOpen = t.status.toLowerCase().includes('abierto');
          return {
            ...t,
            status: isCurrentlyOpen ? 'Aprobado y cerrado' : 'Abierto'
          };
        }
        return t;
      })
    );
  };

  const getTicketIcon = (type: SupportTicket['type']) => {
    switch (type) {
      case 'bug':
        return (
          <div className="w-8 h-8 rounded-full bg-[#1b2b3d] border border-[#2c4766] flex items-center justify-center text-[#60a5fa] shrink-0">
            <Bug className="w-4 h-4" />
          </div>
        );
      case 'idea':
        return (
          <div className="w-8 h-8 rounded-full bg-[#163327] border border-[#235841] flex items-center justify-center text-[#4ade80] shrink-0">
            <Lightbulb className="w-4 h-4" />
          </div>
        );
      case 'request':
        return (
          <div className="w-8 h-8 rounded-full bg-[#193339] border border-[#285762] flex items-center justify-center text-[#2dd4bf] shrink-0">
            <Package className="w-4 h-4" />
          </div>
        );
    }
  };

  const getStatusBadge = (status: SupportTicket['status']) => {
    if (status.toLowerCase().includes('abierto')) {
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1a2d48] text-[#93c5fd] border border-[#2b4c7c]">
          Abierto
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#163627] text-[#86efac] border border-[#245b3f] flex items-center gap-1">
        <CheckCircle2 className="w-2.5 h-2.5" />
        Aprobado y cerrado
      </span>
    );
  };

  const getPriorityBadge = (priority: SupportTicket['priority']) => {
    switch (priority) {
      case 'Alta':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#3d181c] text-[#fca5a5] border border-[#6b252c]">
            Alta
          </span>
        );
      case 'Media':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#352516] text-[#fde047] border border-[#5d411f]">
            Media
          </span>
        );
      case 'Baja':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#22242c] text-[#cbd5e1] border border-[#373a46]">
            Baja
          </span>
        );
    }
  };

  return (
    <div
      onClick={onClose}
      className="absolute inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm p-0 animate-in fade-in duration-150 overflow-hidden"
    >
      <div
        className="w-full bg-[#14151a] border-t border-[#2d303b] rounded-t-3xl h-[92%] max-h-[92%] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile handle indicator */}
        <div className="w-12 h-1.5 bg-slate-600/50 rounded-full mx-auto mt-2.5 mb-1 shrink-0" />

        {/* Top Header - Exact Red banner from screenshot, mobile optimized */}
        <div className="bg-[#ef4444] text-white px-4 py-2.5 flex items-center justify-between shadow-md shrink-0">
          <div className="min-w-0 pr-2">
            <h2 className="text-sm font-bold tracking-tight truncate">Bandeja de tickets</h2>
            <p className="text-[11px] text-red-100 font-normal truncate">Sugerencias, bugs y peticiones</p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-red-700/80 hover:bg-red-800 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0"
            title="Cerrar soporte web"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action bar: Filter dropdown + "+ Nuevo" button matching original desktop design */}
        <div className="p-2.5 bg-[#181920] border-b border-[#252833] space-y-2 shrink-0">
          <div className="flex items-center justify-between gap-2">
            {/* Dropdown with Filter icon */}
            <div className="relative flex-1 min-w-0">
              <div className="flex items-center gap-1.5 bg-[#121317] border border-[#2b2e3a] rounded-xl px-2.5 py-1.5 text-xs text-slate-200">
                <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent w-full text-xs text-slate-200 focus:outline-none cursor-pointer appearance-none pr-5 truncate"
                >
                  <option value="todos" className="bg-[#181920] text-slate-200">Todos los estados</option>
                  <option value="abierto" className="bg-[#181920] text-slate-200">Abiertos</option>
                  <option value="cerrado" className="bg-[#181920] text-slate-200">Aprobados y cerrados</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
              </div>
            </div>

            {/* "+ Nuevo" Button in red */}
            <button
              onClick={() => setShowNewForm(!showNewForm)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#cc3b3b] hover:bg-[#b83333] active:scale-95 text-white font-bold text-xs shadow-md transition-all shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Nuevo</span>
            </button>
          </div>

          {/* Category filter pills - Smooth touch scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px] touch-pan-x">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'bug', label: '🐛 Bugs', count: tickets.filter((t) => t.type === 'bug').length },
              { id: 'idea', label: '💡 Ideas', count: tickets.filter((t) => t.type === 'idea').length },
              { id: 'request', label: '📦 Peticiones', count: tickets.filter((t) => t.type === 'request').length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTypeFilter(tab.id)}
                className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors shrink-0 ${
                  typeFilter === tab.id
                    ? 'bg-slate-200 text-slate-900 shadow-sm'
                    : 'bg-[#121317] text-slate-400 hover:text-slate-200 border border-[#272a34]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Container for Tickets & Form */}
        <div className="p-3 space-y-2.5 overflow-y-auto overscroll-contain flex-1 touch-pan-y scrollbar-thin">
          {/* New Ticket Form */}
          {showNewForm && (
            <form
              onSubmit={handleCreateTicket}
              className="p-3.5 rounded-2xl bg-[#1b1c24] border border-red-500/50 space-y-2.5 shadow-xl animate-in fade-in"
            >
              <div className="flex items-center justify-between border-b border-[#2a2d39] pb-1.5">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-red-400" />
                  Crear Nuevo Ticket de Soporte
                </span>
                <button
                  type="button"
                  onClick={() => setShowNewForm(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="text-[11px] text-slate-300 block mb-1">Título o Falla *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ej. Error al validar cédula en garita..."
                  className="w-full px-3 py-2 bg-[#121316] border border-[#2d303b] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-300 block mb-1">Tipo</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 bg-[#121316] border border-[#2d303b] rounded-xl text-xs text-white"
                  >
                    <option value="bug">Falla / Bug</option>
                    <option value="idea">Sugerencia</option>
                    <option value="request">Petición</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-300 block mb-1">Prioridad</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 bg-[#121316] border border-[#2d303b] rounded-xl text-xs text-white"
                  >
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-300 block mb-1">Detalle del reporte</label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe qué ocurrió, en qué condominio o garita..."
                  className="w-full px-3 py-1.5 bg-[#121316] border border-[#2d303b] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowNewForm(false)}
                  className="px-3 py-1.5 rounded-lg bg-[#242732] text-slate-300 text-xs font-medium cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  Enviar Ticket
                </button>
              </div>
            </form>
          )}

          {/* Ticket Counter Info */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span>{filteredTickets.length} tickets encontrados</span>
            <span className="text-[10px] text-slate-500">Toca un ticket para ver detalles</span>
          </div>

          {/* Ticket cards */}
          <div className="space-y-2">
            {filteredTickets.map((ticket) => {
              const isSelected = selectedTicketId === ticket.id;
              return (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicketId(isSelected ? null : ticket.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1c1e28] border-red-500/60 shadow-lg ring-1 ring-red-500/20'
                      : 'bg-[#16171d] border-[#252832] hover:border-[#353948]'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {/* Left Icon (Bug, Idea, Request) */}
                    {getTicketIcon(ticket.type)}

                    {/* Middle Title and Badges */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs font-semibold text-slate-400 font-mono">
                          #{ticket.id}
                        </span>
                        <h3 className="text-xs font-bold text-white truncate">
                          {ticket.title}
                        </h3>
                      </div>

                      {/* Status and Priority badges */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {getStatusBadge(ticket.status)}
                        {getPriorityBadge(ticket.priority)}
                      </div>

                      {/* Author */}
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 pt-0.5">
                        <User className="w-3 h-3 text-slate-500 shrink-0" />
                        <span className="truncate">{ticket.author}</span>
                      </div>
                    </div>

                    {/* Date on right */}
                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-slate-400 font-mono block">
                        {ticket.date}
                      </span>
                    </div>
                  </div>

                  {/* Expanded detail when tapped */}
                  {isSelected && (
                    <div
                      className="mt-2.5 pt-2.5 border-t border-[#282b37] text-xs space-y-2.5 animate-in fade-in"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="bg-[#121317] p-2.5 rounded-xl border border-[#232631] space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Descripción del caso
                        </span>
                        <p className="text-slate-200 text-xs leading-relaxed">
                          {ticket.description || 'Sin notas adicionales para este reporte.'}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
                        <span className="text-[11px] text-slate-400">
                          Reportó: <strong className="text-white">{ticket.author}</strong>
                        </span>

                        <button
                          onClick={() => toggleStatus(ticket.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            ticket.status.toLowerCase().includes('abierto')
                              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                              : 'bg-[#252834] text-slate-300 hover:text-white'
                          }`}
                        >
                          {ticket.status.toLowerCase().includes('abierto') ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Marcar como resuelto</span>
                            </>
                          ) : (
                            <>
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Reabrir ticket</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredTickets.length === 0 && (
              <div className="py-8 text-center text-slate-400 text-xs space-y-1">
                <p>No hay tickets para este filtro.</p>
                <button
                  onClick={() => {
                    setStatusFilter('todos');
                    setTypeFilter('todos');
                  }}
                  className="text-red-400 hover:underline font-semibold"
                >
                  Restablecer filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
