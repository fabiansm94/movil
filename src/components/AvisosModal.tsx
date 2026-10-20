import React, { useState } from 'react';
import {
  X,
  Send,
  Trash2,
  Megaphone,
  Sparkles,
  Clock,
  Bell,
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface NoticeItem {
  id: string;
  content: string;
  author: string;
  date: string;
  type: 'general' | 'actualizacion';
}

const INITIAL_NOTICES: NoticeItem[] = [
  {
    id: 'aviso-1',
    content: `-Se quito el eliminado automatico de las rentas despues de su dia de salida.\n-Se arreglo el error en el staff construccion donde la cedula no aparecia a la hora de guardar el registro\n-se hicieron varios cambios visuales en la pagina\n-Se añadio una nueva opcion al menu llamada MONITOREO, por favor revisarla`,
    author: 'Soporte Web',
    date: '7 oct 2026 07:39',
    type: 'general'
  },
  {
    id: 'aviso-2',
    content: 'Recarguen la pagina cntrl+f5',
    author: 'Soporte Web',
    date: '21 sep 2026 12:41',
    type: 'general'
  },
  {
    id: 'aviso-3',
    content: `Recarguen la pagina, hice un cambio en los botones del ewelink.\n\nAhora solo estan los canales necesarios y ademas las tarjetas de cada sitio, tiene una funcionalidad drag and drop para que las acomoden a gusto (esto es mejor propiamente en cada estacion, si lo hacen en general no queda muy bien)`,
    author: 'Soporte Web',
    date: '16 sep 2026 15:17',
    type: 'general'
  },
  {
    id: 'aviso-4',
    content: 'Se añadio la posibilidad de anadir personas a la asistencia de dias anteriores',
    author: 'Soporte Web',
    date: '12 ago 2026 14:17',
    type: 'general'
  },
  {
    id: 'aviso-5',
    content: '-Se añadio un registro de rentas general al inicio',
    author: 'Soporte Web',
    date: '1 ago 2026 09:12',
    type: 'general'
  }
];

const INITIAL_UPDATES: NoticeItem[] = [
  {
    id: 'upd-1',
    content: '🚀 Versión 3.5: Nueva interfaz optimizada para dispositivos móviles (iOS y Android) con confinamiento total de pantallas y scroll fluido.',
    author: 'Soporte Web',
    date: 'Hoy, 09:30',
    type: 'actualizacion'
  },
  {
    id: 'upd-2',
    content: '📹 Integración de cámaras Xeoma CCTV con protocolo RTSP en tiempo real para 9 condominios.',
    author: 'Soporte Web',
    date: '15 oct 2026 11:20',
    type: 'actualizacion'
  },
  {
    id: 'upd-3',
    content: '🛡️ Validación de cédulas con formato automático y filtro por condominio para evitar duplicidades.',
    author: 'Soporte Web',
    date: '10 oct 2026 16:45',
    type: 'actualizacion'
  }
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onShowToast?: (msg: string) => void;
}

export const AvisosModal: React.FC<Props> = ({ isOpen, onClose, onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'actualizaciones'>('general');
  const [notices, setNotices] = useState<NoticeItem[]>(INITIAL_NOTICES);
  const [updates, setUpdates] = useState<NoticeItem[]>(INITIAL_UPDATES);
  const [messageText, setMessageText] = useState('');
  const [showRemindersModal, setShowRemindersModal] = useState(false);
  const [reminders, setReminders] = useState([
    { id: 'rem-1', title: 'Revisión de cámaras perimetrales', time: '14:00', active: true },
    { id: 'rem-2', title: 'Relevo con guardia entrante', time: '18:00', active: true },
    { id: 'rem-3', title: 'Verificar portón Foresta en modo automático', time: '20:30', active: false }
  ]);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newNotice: NoticeItem = {
      id: `notice-${Date.now()}`,
      content: messageText.trim(),
      author: 'Soporte Web',
      date: 'Hoy ' + new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' }),
      type: activeTab === 'general' ? 'general' : 'actualizacion'
    };

    if (activeTab === 'general') {
      setNotices([newNotice, ...notices]);
    } else {
      setUpdates([newNotice, ...updates]);
    }

    setMessageText('');
    if (onShowToast) {
      onShowToast('Aviso publicado en tiempo real');
    }
  };

  const handleDeleteNotice = (id: string) => {
    if (activeTab === 'general') {
      setNotices((prev) => prev.filter((n) => n.id !== id));
    } else {
      setUpdates((prev) => prev.filter((n) => n.id !== id));
    }
    if (onShowToast) {
      onShowToast('Aviso eliminado del historial');
    }
  };

  const currentList = activeTab === 'general' ? notices : updates;

  return (
    <div
      onClick={onClose}
      className="absolute inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm p-0 animate-in fade-in duration-150 overflow-hidden"
    >
      <div
        className="w-full bg-[#14151a] border-t border-[#2d303b] rounded-t-3xl h-[94%] max-h-[94%] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile handle indicator */}
        <div className="w-12 h-1.5 bg-slate-600/50 rounded-full mx-auto mt-2.5 mb-1 shrink-0" />

        {/* Header - Red Banner matching screenshot */}
        <div className="bg-[#cc3b3b] text-white px-4 py-2.5 flex items-center justify-between shrink-0 shadow-md">
          <h2 className="text-sm font-bold tracking-tight">Avisos</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-red-700/80 hover:bg-red-800 flex items-center justify-center text-white cursor-pointer transition-colors"
            title="Cerrar avisos"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher: Mensaje general vs Actualizaciones */}
        <div className="flex border-b border-[#252833] bg-[#121317] shrink-0 text-xs">
          <button
            onClick={() => setActiveTab('general')}
            className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-2 font-medium transition-colors cursor-pointer border-b-2 ${
              activeTab === 'general'
                ? 'border-[#cc3b3b] text-white font-bold bg-[#171821]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5 text-red-400" />
            <span>Mensaje general</span>
          </button>

          <button
            onClick={() => setActiveTab('actualizaciones')}
            className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-2 font-medium transition-colors cursor-pointer border-b-2 ${
              activeTab === 'actualizaciones'
                ? 'border-[#cc3b3b] text-white font-bold bg-[#171821]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>Actualizaciones</span>
          </button>
        </div>

        {/* Message Input Section */}
        <div className="p-3 bg-[#171820] border-b border-[#242732] shrink-0 space-y-2">
          <form onSubmit={handleSendMessage} className="space-y-2">
            <textarea
              rows={3}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Escribe un mensaje que verán todos los usuarios en tiempo real..."
              className="w-full p-2.5 bg-[#0f1013] border border-[#2b2d38] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#cc3b3b] resize-none leading-relaxed"
            />

            <div className="flex items-center justify-between text-xs pt-0.5">
              <span className="text-[11px] text-slate-400">
                Se firma como <strong className="text-white font-semibold">Soporte Web</strong>
              </span>

              <button
                type="submit"
                disabled={!messageText.trim()}
                className={`px-4 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                  messageText.trim()
                    ? 'bg-[#cc3b3b] hover:bg-[#b83333] text-white active:scale-95'
                    : 'bg-[#252834] text-slate-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar</span>
              </button>
            </div>
          </form>
        </div>

        {/* Scrollable Historial Section */}
        <div className="flex-1 overflow-y-auto overscroll-contain touch-pan-y scrollbar-thin p-3 space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              HISTORIAL
            </span>
            <span className="text-[10px] text-slate-500">
              {currentList.length} avisos registrados
            </span>
          </div>

          <div className="space-y-2">
            {currentList.map((notice) => (
              <div
                key={notice.id}
                className="p-3 rounded-xl bg-[#191a21] border border-[#262834] shadow-sm relative group hover:border-[#353849] transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0 pr-1">
                    <p className="text-xs text-slate-200 whitespace-pre-line leading-relaxed font-normal">
                      {notice.content}
                    </p>

                    <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1.5">
                      <span className="font-medium text-slate-400">{notice.author}</span>
                      <span>·</span>
                      <span>{notice.date}</span>
                    </div>
                  </div>

                  {/* Delete Trash Icon Button matching screenshot */}
                  <button
                    onClick={() => handleDeleteNotice(notice.id)}
                    className="text-red-500/80 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-950/40 transition-colors cursor-pointer shrink-0"
                    title="Eliminar aviso"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {currentList.length === 0 && (
              <div className="py-8 text-center text-slate-500 text-xs">
                No hay avisos en esta sección.
              </div>
            )}
          </div>
        </div>

        {/* Bottom Action Button: Gestionar Recordatorios matching screenshot */}
        <div className="p-3 bg-[#14151a] border-t border-[#22242d] shrink-0">
          <button
            onClick={() => setShowRemindersModal(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-[#171821] hover:bg-[#20222e] border border-[#2c2f3d] text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
          >
            <Clock className="w-3.5 h-3.5 text-red-400" />
            <span>Gestionar Recordatorios</span>
          </button>
        </div>

        {/* Nested Reminders Sheet */}
        {showRemindersModal && (
          <div
            onClick={() => setShowRemindersModal(false)}
            className="absolute inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm p-0 animate-in fade-in"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-[#181920] border-t border-[#313444] rounded-t-3xl max-h-[85%] flex flex-col shadow-2xl p-4 space-y-3 animate-in slide-in-from-bottom duration-150"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#282b39]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-red-950/80 border border-red-500/40 flex items-center justify-center text-red-400">
                    <Bell className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Recordatorios Programados</h3>
                    <span className="text-[10px] text-slate-400">Alertas automáticas en garita</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowRemindersModal(false)}
                  className="w-7 h-7 rounded-full bg-[#232631] text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2 overflow-y-auto max-h-56">
                {reminders.map((rem) => (
                  <div
                    key={rem.id}
                    className="p-3 rounded-xl bg-[#121317] border border-[#252835] flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white">{rem.title}</h4>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-red-400" />
                        Hora: {rem.time}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setReminders((prev) =>
                          prev.map((r) => (r.id === rem.id ? { ...r, active: !r.active } : r))
                        );
                        if (onShowToast) {
                          onShowToast(rem.active ? 'Recordatorio pausado' : 'Recordatorio activado');
                        }
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                        rem.active
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-[#222530] text-slate-400 border border-[#303444]'
                      }`}
                    >
                      {rem.active ? 'Activo' : 'Pausado'}
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  if (onShowToast) onShowToast('Nuevo recordatorio añadido para las 22:00');
                  setReminders([
                    ...reminders,
                    { id: `rem-${Date.now()}`, title: 'Verificación nocturna de portón', time: '22:00', active: true }
                  ]);
                }}
                className="w-full py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all"
              >
                + Agregar Recordatorio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
