import React, { useState } from 'react';
import {
  INITIAL_AUTHORIZED,
  INITIAL_RENTALS,
  POLICE_CONTACTS,
  GUARD_USERS,
  DAILY_NOTES
} from './data/mockData';
import {
  AuthorizedPerson,
  RentalGuest,
  GuardUser,
  EmergencyContact,
  MobileTab,
  DevicePreviewMode
} from './types';
import { MobileHeader } from './components/MobileHeader';
import { GreetingAndStats } from './components/GreetingAndStats';
import { QuickAccessBar } from './components/QuickAccessBar';
import { SearchAndRecords } from './components/SearchAndRecords';
import { RecordDetailSheet } from './components/RecordDetailSheet';
import { NewRecordModal } from './components/NewRecordModal';
import { XeomaMonitoringModal } from './components/XeomaMonitoringModal';
import { PoliceEmergencySheet } from './components/PoliceEmergencySheet';
import { ActiveUsersSheet } from './components/ActiveUsersSheet';
import { CalendarWidget } from './components/CalendarWidget';
import { DailyNotesModal } from './components/DailyNotesModal';
import { SupportTicketsModal } from './components/SupportTicketsModal';
import { AvisosModal } from './components/AvisosModal';
import { RegistroDiarioModal } from './components/RegistroDiarioModal';
import { AsistenciaForestaModal } from './components/AsistenciaForestaModal';
import { AsistenciaSunsetModal } from './components/AsistenciaSunsetModal';
import { RegistroPumilioModal } from './components/RegistroPumilioModal';
import { StaffCimaRealModal } from './components/StaffCimaRealModal';
import { NotesPage, NoteCardItem, INITIAL_NOTE_CARDS } from './components/NotesPage';
import { CreateNoteModal } from './components/CreateNoteModal';
import { MoreOptionsMenu } from './components/MoreOptionsMenu';
import { ProcedimientosView } from './components/ProcedimientosView';
import { BottomNav } from './components/BottomNav';
import { DeviceFrameSelector } from './components/DeviceFrameSelector';
import {
  Video,
  Building2,
  Users,
  X,
  FileText,
  UserCheck,
  Megaphone,
  Hotel,
  HardHat
} from 'lucide-react';

export default function App() {
  // Application Data States
  const [authorizedList, setAuthorizedList] = useState<AuthorizedPerson[]>(INITIAL_AUTHORIZED);
  const [rentalsList, setRentalsList] = useState<RentalGuest[]>(INITIAL_RENTALS);
  const [policeList, setPoliceList] = useState<EmergencyContact[]>(POLICE_CONTACTS);
  const [guardUsers, setGuardUsers] = useState<GuardUser[]>(GUARD_USERS);

  // Navigation & View States - Default to Android phone view
  const [activeTab, setActiveTab] = useState<MobileTab>('inicio');
  const [previewMode, setPreviewMode] = useState<DevicePreviewMode>('android');

  // Modal & Sheet States
  const [selectedPerson, setSelectedPerson] = useState<AuthorizedPerson | null>(null);
  const [isNewRecordOpen, setIsNewRecordOpen] = useState(false);
  const [newRecordInitialCondo, setNewRecordInitialCondo] = useState<string | undefined>(undefined);
  const [isRegistroDiarioOpen, setIsRegistroDiarioOpen] = useState(false);
  const [isAsistenciaForestaOpen, setIsAsistenciaForestaOpen] = useState(false);
  const [isAsistenciaSunsetOpen, setIsAsistenciaSunsetOpen] = useState(false);
  const [isRegistroPumilioOpen, setIsRegistroPumilioOpen] = useState(false);
  const [isStaffCimaRealOpen, setIsStaffCimaRealOpen] = useState(false);
  const [isXeomaOpen, setIsXeomaOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isWebSupportOpen, setIsWebSupportOpen] = useState(false);
  const [isAvisosOpen, setIsAvisosOpen] = useState(false);
  const [isCondosModalOpen, setIsCondosModalOpen] = useState(false);
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [shiftStarted, setShiftStarted] = useState(true);

  // Notes Page States & Confinement inside Mobile Frame
  const [notesList, setNotesList] = useState<NoteCardItem[]>(INITIAL_NOTE_CARDS);
  const [selectedNoteForDetail, setSelectedNoteForDetail] = useState<NoteCardItem | null>(null);
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);

  // Quick Action Modal state (Registro Diario, Asistencia Foresta, etc.)
  const [activeQuickAction, setActiveQuickAction] = useState<{ id: string; title: string } | null>(null);

  // Toast feedback
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleUpdateNote = (updated: NoteCardItem) => {
    setNotesList((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
    if (selectedNoteForDetail?.id === updated.id) {
      setSelectedNoteForDetail(updated);
    }
  };

  const handleToggleNoteBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setNotesList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isBookmarked: !n.isBookmarked } : n))
    );
    if (selectedNoteForDetail?.id === id) {
      setSelectedNoteForDetail((prev) => (prev ? { ...prev, isBookmarked: !prev.isBookmarked } : null));
    }
    showToast('Marcador actualizado');
  };

  const handleToggleReadNote = (id: string, currentStatus: boolean) => {
    setNotesList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, readByFabian: !currentStatus } : n))
    );
    if (selectedNoteForDetail?.id === id) {
      setSelectedNoteForDetail((prev) => (prev ? { ...prev, readByFabian: !currentStatus } : null));
    }
    showToast(!currentStatus ? 'Nota marcada como leída' : 'Nota marcada como pendiente');
  };

  const handleDeleteNote = (id: string, title?: string) => {
    setNotesList((prev) => prev.filter((n) => n.id !== id));
    if (selectedNoteForDetail?.id === id) {
      setSelectedNoteForDetail(null);
    }
    showToast(title ? `Nota "${title}" eliminada` : 'Nota eliminada');
  };

  const handleSaveNewNote = (created: NoteCardItem) => {
    setNotesList((prev) => [created, ...prev]);
    setIsCreateNoteOpen(false);
    showToast('¡Nota agregada con éxito!');
  };

  const handleLogAccess = (type: 'entrada' | 'salida', person: AuthorizedPerson) => {
    const timeStr = `Hoy, ${new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' })}`;
    setAuthorizedList((prev) =>
      prev.map((item) =>
        item.id === person.id
          ? {
              ...item,
              lastAccess: `${type === 'entrada' ? 'Ingreso' : 'Salida'} a las ${timeStr}`
            }
          : item
      )
    );
    showToast(`${type === 'entrada' ? 'Entrada autorizada' : 'Salida registrada'} para ${person.fullName}`);
  };

  const handleSaveNewRecord = (newPerson: AuthorizedPerson) => {
    setAuthorizedList([newPerson, ...authorizedList]);
    setSelectedPerson(newPerson);
    showToast(`Nuevo registro guardado: ${newPerson.fullName}`);
  };

  const handleAssignCondo = (userId: string, condo: string) => {
    setGuardUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, condo } : u))
    );
  };

  const handleQuickAction = (actionKey: string, title: string) => {
    if (actionKey === 'registro-diario') {
      setIsRegistroDiarioOpen(true);
      return;
    }
    if (actionKey === 'asistencia-foresta') {
      setIsAsistenciaForestaOpen(true);
      return;
    }
    if (actionKey === 'asistencia-sunset') {
      setIsAsistenciaSunsetOpen(true);
      return;
    }
    if (actionKey === 'registro-pumilio') {
      setIsRegistroPumilioOpen(true);
      return;
    }
    if (actionKey === 'staff-cima-real') {
      setIsStaffCimaRealOpen(true);
      return;
    }
    setActiveQuickAction({ id: actionKey, title });
  };

  const handleOpenCondoRegister = (condoName: string) => {
    setIsRegistroDiarioOpen(false);
    if (condoName.includes('Pumilio')) {
      setIsRegistroPumilioOpen(true);
      return;
    }
    if (condoName.includes('Cima Real')) {
      setIsStaffCimaRealOpen(true);
      return;
    }
    setNewRecordInitialCondo(condoName);
    setIsNewRecordOpen(true);
    showToast(`Registro Diario abierto para ${condoName}`);
  };

  // 9 Condominiums list
  const condominiums = [
    { name: 'Condominio Foresta', units: 36, location: 'Escazú', status: 'Seguridad STS Activa' },
    { name: 'Condominio Sunset Hills', units: 28, location: 'Santa Ana', status: 'Garita 24/7' },
    { name: 'Hotel Pumilio', units: 24, location: 'Jaco / Central', status: 'Acceso Huéspedes' },
    { name: 'Condominio Cima Real', units: 19, location: 'San Rafael', status: 'Monitoreo Xeoma' },
    { name: 'Bosque Real Residencial', units: 18, location: 'Santa Ana', status: 'LPR Placas' },
    { name: 'Vistas del Sol', units: 14, location: 'Guachipelín', status: 'Portón Automatizado' },
    { name: 'Trejos Montealegre Condos', units: 12, location: 'Escazú', status: 'Oficial en Garita' },
    { name: 'Lindora Park Executive', units: 11, location: 'Lindora', status: 'CCTV Xeoma' },
    { name: 'Avalon Flats', units: 9, location: 'Santa Ana', status: 'Control Peatonal' }
  ];

  return (
    <div className="min-h-screen bg-[#07080a] flex flex-col items-center">
      {/* Device Frame Switcher Bar */}
      <div className="w-full sticky top-0 z-50 bg-[#0c0d10]/95 backdrop-blur border-b border-[#1c1d22]">
        <DeviceFrameSelector
          mode={previewMode}
          onChange={(newMode) => setPreviewMode(newMode)}
        />
      </div>

      {/* Main Container: Centers the mobile phone frame */}
      <div className="py-1 sm:py-4 px-1 sm:px-2 flex-1 flex justify-center items-center sm:items-start w-full">
        {/* Phone Shell: All popups, headers, content and nav are strictly contained here */}
        <div
          className={`relative w-full max-w-[412px] h-[100dvh] sm:h-[840px] sm:max-h-[90vh] bg-[#0f1013] flex flex-col overflow-hidden shadow-2xl transition-all ${
            previewMode === 'ios'
              ? 'rounded-none sm:rounded-[48px] border-0 sm:border-[4px] border-[#383a42] ring-1 ring-slate-800'
              : previewMode === 'android'
              ? 'rounded-none sm:rounded-[38px] border-0 sm:border-[3px] border-[#2e3037] ring-1 ring-slate-800'
              : 'rounded-none sm:rounded-[36px] border-0 sm:border-[2px] border-[#2a2c35]'
          }`}
        >
          {/* Toast Notification - strictly inside phone shell */}
          {toast && (
            <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 border border-red-500/60 text-white text-xs px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 max-w-[88%] text-center">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span className="truncate">{toast}</span>
            </div>
          )}

          {/* 1. Device Notch / Status Bar */}
          {previewMode === 'ios' ? (
            <div className="shrink-0 bg-[#0f1013] select-none z-30">
              {/* iPhone Dynamic Island */}
              <div className="w-28 h-5 bg-black rounded-full mx-auto mt-2 flex items-center justify-between px-3 pointer-events-none ring-1 ring-slate-800">
                <span className="w-2 h-2 rounded-full bg-slate-900 ring-1 ring-slate-800" />
                <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
              </div>
              <div className="px-5 py-1 flex justify-between items-center text-[11px] font-semibold text-white">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px]">5G</span>
                  <div className="w-5 h-2.5 border border-white rounded-sm p-0.5 flex items-center">
                    <div className="w-full h-full bg-white rounded-xs" />
                  </div>
                </div>
              </div>
            </div>
          ) : previewMode === 'android' ? (
            <div className="shrink-0 bg-[#0f1013] select-none z-30 pt-1.5 px-4 pb-1">
              {/* Android Punch Hole Camera */}
              <div className="w-3.5 h-3.5 bg-black rounded-full mx-auto mb-0.5 ring-1 ring-slate-800 pointer-events-none flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              </div>
              <div className="flex justify-between items-center text-[10px] font-medium text-slate-300">
                <span>10:30</span>
                <div className="flex items-center gap-2">
                  <span>LTE</span>
                  <span>85%</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="shrink-0 bg-[#0f1013] px-4 py-1 flex justify-between items-center text-[10px] font-medium text-slate-400 select-none border-b border-[#1c1d22]">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Control & Monitoreo STS
              </span>
              <span>100%</span>
            </div>
          )}

          {/* 2. Pinned Mobile Header (Brand, Red Alert Banner, User Profile & Bell) */}
          <MobileHeader
            shiftStarted={shiftStarted}
            onOpenNotifications={() => setIsAvisosOpen(true)}
            onOpenProfile={() => setIsShiftModalOpen(true)}
            onStartShift={() => setIsShiftModalOpen(true)}
            unreadCount={5}
          />

          {/* 3. The ONLY Scrollable Viewport for Main Content (Smooth Natural Scroll) */}
          <div
            id="mobile-main-scroll"
            className="flex-1 overflow-y-auto overscroll-contain relative touch-pan-y scrollbar-thin flex flex-col w-full"
          >
            <main className="px-3 sm:px-3.5 py-3 space-y-3.5 pb-20 max-w-full w-full">
              {activeTab === 'inicio' && (
                <>
                  {/* Greeting, Notes reminder & Quick Actions (Soporte Web, Avisos, Soporte Tecs) */}
                  <GreetingAndStats
                    onOpenNotes={() => setActiveTab('notas')}
                    onOpenAvisos={() => setIsAvisosOpen(true)}
                    onOpenTechSupport={() => {
                      showToast('Conectando con soporte técnico STS: 2200-8800');
                      window.location.href = 'tel:22008800';
                    }}
                    onOpenCondosList={() => setIsCondosModalOpen(true)}
                    onOpenWebSupport={() => setIsWebSupportOpen(true)}
                  />

                  {/* Horizontal Scrollable Quick Access Bar */}
                  <QuickAccessBar
                    onSelectAction={handleQuickAction}
                    onNewFastEntry={() => setIsNewRecordOpen(true)}
                  />

                  {/* Xeoma Remote Control Card */}
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-[#1c191a] via-[#1a1b20] to-[#16171b] border border-[#2b2d36] flex items-center justify-between gap-2.5 shadow-md">
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-950/70 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
                        <Video className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white truncate">Control remoto Xeoma</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        </div>
                        <span className="text-[10px] sm:text-[11px] text-slate-400 truncate block">
                          Administrar el servicio de monitoreo
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsXeomaOpen(true)}
                      className="px-3 py-1.5 rounded-xl bg-[#e14c4c] hover:bg-red-500 text-white font-bold text-xs shadow-md shadow-red-950/60 active:scale-95 transition-all shrink-0 cursor-pointer"
                    >
                      Abrir
                    </button>
                  </div>

                  {/* Search and Records Main Module (Registros / Rentas) */}
                  <SearchAndRecords
                    authorizedList={authorizedList}
                    rentalsList={rentalsList}
                    onSelectPerson={(person) => setSelectedPerson(person)}
                    onSelectRental={(rental) => {
                      showToast(`Huésped: ${rental.guestName} (${rental.condoName} ${rental.unitNumber})`);
                    }}
                    onOpenNewRental={() => setIsNewRecordOpen(true)}
                    activeSelectedPersonId={selectedPerson?.id}
                  />

                  {/* Quick Widgets on Home */}
                  <div className="grid grid-cols-1 gap-3.5 pt-1">
                    {/* Municipal Police Card */}
                    <PoliceEmergencySheet
                      embedded
                      contacts={policeList.slice(0, 3)}
                      onAddContact={(newContact) => setPoliceList([...policeList, newContact])}
                    />

                    {/* Active Guards Online */}
                    <ActiveUsersSheet
                      embedded
                      users={guardUsers}
                      onAssignCondo={handleAssignCondo}
                    />

                    {/* Calendar Widget (Octubre 2026) */}
                    <CalendarWidget
                      onSelectDate={(day) => {
                        showToast(`Octubre ${day}, 2026: 4 oficiales asignados en garita`);
                      }}
                    />
                  </div>
                </>
              )}

              {/* Tab: Notas (Página de notas con composición exacta solicitada) */}
              {(activeTab === 'notas' || (activeTab as any) === 'registros') && (
                <NotesPage
                  notes={notesList}
                  selectedNote={selectedNoteForDetail}
                  onSelectNote={(note) => setSelectedNoteForDetail(note)}
                  onOpenCreateNote={() => setIsCreateNoteOpen(true)}
                  onToggleBookmark={handleToggleNoteBookmark}
                  onToggleRead={handleToggleReadNote}
                  onDeleteNote={handleDeleteNote}
                  onUpdateNote={handleUpdateNote}
                  onShowToast={showToast}
                  onGoBack={() => {
                    if (selectedNoteForDetail) {
                      setSelectedNoteForDetail(null);
                    } else {
                      setActiveTab('inicio');
                    }
                  }}
                />
              )}

              {/* Tab: Procedimientos Operativos STS (Replaces Xeoma in bottom bar) */}
              {activeTab === 'procedimientos' && (
                <ProcedimientosView onShowToast={showToast} />
              )}

              {activeTab === 'monitoreo' && (
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-white">Monitoreo Xeoma CCTV</h2>
                      <p className="text-xs text-slate-400">Circuito cerrado de televisión en garitas</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                      4 cámaras activas
                    </span>
                  </div>

                  {/* Camera Quick Preview Card */}
                  <div className="p-4 rounded-2xl bg-[#16171d] border border-[#272a33] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-red-950/80 border border-red-500/40 flex items-center justify-center text-red-400">
                          <Video className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-white">Servidor de Monitoreo Central</h3>
                          <span className="text-[10px] text-slate-400">Xeoma VMS Pro · Transmisión H.265</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsXeomaOpen(true)}
                        className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md cursor-pointer"
                      >
                        Pantalla Completa
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div
                        onClick={() => setIsXeomaOpen(true)}
                        className="aspect-video rounded-xl bg-slate-900 border border-[#2b2e38] flex flex-col justify-between p-2 cursor-pointer hover:border-red-500/50 transition-colors"
                      >
                        <span className="text-[10px] font-mono text-white/90">CAM 01 - Foresta</span>
                        <span className="text-[9px] text-emerald-400 flex items-center gap-1 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          ONLINE
                        </span>
                      </div>

                      <div
                        onClick={() => setIsXeomaOpen(true)}
                        className="aspect-video rounded-xl bg-slate-900 border border-[#2b2e38] flex flex-col justify-between p-2 cursor-pointer hover:border-red-500/50 transition-colors"
                      >
                        <span className="text-[10px] font-mono text-white/90">CAM 02 - Sunset</span>
                        <span className="text-[9px] text-amber-400 flex items-center gap-1 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          MOVIMIENTO
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Active Users Online */}
                  <ActiveUsersSheet
                    embedded
                    users={guardUsers}
                    onAssignCondo={handleAssignCondo}
                  />
                </div>
              )}

              {activeTab === 'mas' && (
                <div className="space-y-3.5">
                  <div>
                    <h2 className="text-base font-bold text-white">Centro de Operaciones</h2>
                    <p className="text-xs text-slate-400">Gestión de turnos, calendario y bitácora</p>
                  </div>

                  {/* Menu options grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => setIsAvisosOpen(true)}
                      className="p-3.5 rounded-xl bg-[#18191d] border border-[#272a32] text-left hover:border-amber-500 transition-all flex flex-col justify-between h-24 cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400">
                        <Megaphone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">Avisos</span>
                        <span className="text-[10px] text-slate-400">Mensajes & Recordatorios</span>
                      </div>
                    </button>

                    <button
                      onClick={() => setIsWebSupportOpen(true)}
                      className="p-3.5 rounded-xl bg-[#18191d] border border-[#272a32] text-left hover:border-blue-500 transition-all flex flex-col justify-between h-24 cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">Soporte Web</span>
                        <span className="text-[10px] text-slate-400">Bandeja de tickets</span>
                      </div>
                    </button>

                    <button
                      onClick={() => setIsNotesOpen(true)}
                      className="p-3.5 rounded-xl bg-[#18191d] border border-[#272a32] text-left hover:border-red-500 transition-all flex flex-col justify-between h-24 cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-red-950/80 border border-red-500/40 flex items-center justify-center text-red-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">Notas Diarias</span>
                        <span className="text-[10px] text-slate-400">Bitácora & consignas</span>
                      </div>
                    </button>

                    <button
                      onClick={() => setIsShiftModalOpen(true)}
                      className="p-3.5 rounded-xl bg-[#18191d] border border-[#272a32] text-left hover:border-emerald-500 transition-all flex flex-col justify-between h-24 cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">Relevo de Turno</span>
                        <span className="text-[10px] text-slate-400">Fabian (Supervisor)</span>
                      </div>
                    </button>

                    <button
                      onClick={() => setIsAsistenciaForestaOpen(true)}
                      className="p-3.5 rounded-xl bg-[#18191d] border border-[#272a32] text-left hover:border-emerald-500 transition-all flex flex-col justify-between h-24 cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#142820] border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">Asistencia Foresta</span>
                        <span className="text-[10px] text-slate-400">Staff administrativo</span>
                      </div>
                    </button>

                    <button
                      onClick={() => setIsAsistenciaSunsetOpen(true)}
                      className="p-3.5 rounded-xl bg-[#18191d] border border-[#272a32] text-left hover:border-amber-500 transition-all flex flex-col justify-between h-24 cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#292215] border border-amber-500/40 flex items-center justify-center text-amber-400">
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">Asistencia Sunset</span>
                        <span className="text-[10px] text-slate-400">Sunset Hills Staff</span>
                      </div>
                    </button>

                    <button
                      onClick={() => setIsRegistroPumilioOpen(true)}
                      className="p-3.5 rounded-xl bg-[#18191d] border border-[#272a32] text-left hover:border-purple-500 transition-all flex flex-col justify-between h-24 cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#231b2e] border border-purple-500/40 flex items-center justify-center text-purple-400">
                        <Hotel className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">Hotel Pumilio</span>
                        <span className="text-[10px] text-slate-400">Registro Diario Hotel</span>
                      </div>
                    </button>

                    <button
                      onClick={() => setIsStaffCimaRealOpen(true)}
                      className="p-3.5 rounded-xl bg-[#18191d] border border-[#272a32] text-left hover:border-orange-500 transition-all flex flex-col justify-between h-24 cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#261f1c] border border-orange-500/40 flex items-center justify-center text-orange-400">
                        <HardHat className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">Staff Cima Real</span>
                        <span className="text-[10px] text-slate-400">Staff Construcción</span>
                      </div>
                    </button>

                    <button
                      onClick={() => setIsCondosModalOpen(true)}
                      className="p-3.5 rounded-xl bg-[#18191d] border border-[#272a32] text-left hover:border-amber-500 transition-all flex flex-col justify-between h-24 cursor-pointer col-span-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-7 h-7 rounded-lg bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] text-amber-400 font-semibold px-2 py-0.5 rounded-md bg-amber-950/50 border border-amber-900/50">
                          9 Condominios STS
                        </span>
                      </div>
                      <div className="pt-2">
                        <span className="text-xs font-bold text-white block">Lista de Condominios y Unidades</span>
                        <span className="text-[10px] text-slate-400">171 unidades habitacionales monitoreadas</span>
                      </div>
                    </button>
                  </div>

                  {/* Calendar */}
                  <CalendarWidget />

                  {/* Active personnel */}
                  <ActiveUsersSheet
                    embedded
                    users={guardUsers}
                    onAssignCondo={handleAssignCondo}
                  />

                  {/* Municipal police */}
                  <PoliceEmergencySheet
                    embedded
                    contacts={policeList}
                    onAddContact={(newContact) => setPoliceList([...policeList, newContact])}
                  />
                </div>
              )}
            </main>
          </div>

          {/* 4. Pinned Bottom Navigation Bar */}
          <BottomNav
            activeTab={activeTab}
            onChangeTab={(tab) => {
              setActiveTab(tab);
              if (tab !== 'notas') {
                setSelectedNoteForDetail(null);
              }
            }}
            onQuickNewEntry={() => setIsNewRecordOpen(true)}
            unreadNotesCount={notesList.filter((n) => !n.readByFabian).length}
            isMoreMenuOpen={isMoreMenuOpen}
            onToggleMoreMenu={() => setIsMoreMenuOpen((prev) => !prev)}
          />

          {/* 5. Device Home Indicator */}
          {previewMode === 'ios' ? (
            <div className="w-32 h-1 bg-white/40 rounded-full mx-auto my-1 z-30 shrink-0" />
          ) : previewMode === 'android' ? (
            <div className="w-20 h-1 bg-white/50 rounded-full mx-auto my-1 z-30 shrink-0" />
          ) : null}

          {/* Desplegable: Más Opciones (Activable desde la flechita para arriba en BottomNav) */}
          <MoreOptionsMenu
            isOpen={isMoreMenuOpen}
            onClose={() => setIsMoreMenuOpen(false)}
            onOpenXeoma={() => setIsXeomaOpen(true)}
            onOpenCondos={() => setIsCondosModalOpen(true)}
            onOpenShift={() => setIsShiftModalOpen(true)}
            onOpenPolice={() => {
              showToast('Llamando a central de emergencias');
            }}
            onOpenWebSupport={() => setIsWebSupportOpen(true)}
            onOpenStaffCima={() => setIsStaffCimaRealOpen(true)}
            onOpenPumilio={() => setIsRegistroPumilioOpen(true)}
            onOpenProcedimientos={() => {
              setActiveTab('procedimientos');
              setSelectedNoteForDetail(null);
            }}
          />

          {/* 6. ALL MODALS & SHEETS ARE CONFINED STRICTLY INSIDE THE PHONE SHELL */}
          {/* 1. Vista previa de registro */}
          <RecordDetailSheet
            person={selectedPerson}
            onClose={() => setSelectedPerson(null)}
            onLogAccess={handleLogAccess}
          />

          {/* 2. Modal: Nuevo Registro de Ingreso */}
          <NewRecordModal
            isOpen={isNewRecordOpen}
            onClose={() => {
              setIsNewRecordOpen(false);
              setNewRecordInitialCondo(undefined);
            }}
            onSave={handleSaveNewRecord}
            initialCondo={newRecordInitialCondo}
          />

          {/* 2b. Modal: Registro Diario (Exact match with user screenshot) */}
          <RegistroDiarioModal
            isOpen={isRegistroDiarioOpen}
            onClose={() => setIsRegistroDiarioOpen(false)}
            onOpenRegister={handleOpenCondoRegister}
          />

          {/* 3. Modal: Xeoma Live Monitoring */}
          <XeomaMonitoringModal
            isOpen={isXeomaOpen}
            onClose={() => setIsXeomaOpen(false)}
          />

          {/* 4. Modal: Notas Diarias y Avisos */}
          <DailyNotesModal
            isOpen={isNotesOpen}
            onClose={() => setIsNotesOpen(false)}
          />

          {/* 4b. Modal: Soporte Web - Bandeja de Tickets */}
          <SupportTicketsModal
            isOpen={isWebSupportOpen}
            onClose={() => setIsWebSupportOpen(false)}
          />

          {/* 4c. Modal: Avisos del Sistema (Exact match with user screenshot) */}
          <AvisosModal
            isOpen={isAvisosOpen}
            onClose={() => setIsAvisosOpen(false)}
            onShowToast={showToast}
          />

          {/* 4d. Modal: Asistencia Foresta (Exact match with user screenshot) */}
          <AsistenciaForestaModal
            isOpen={isAsistenciaForestaOpen}
            onClose={() => setIsAsistenciaForestaOpen(false)}
            onShowToast={showToast}
          />

          {/* 4e. Modal: Asistencia Sunset (Same as Asistencia Foresta) */}
          <AsistenciaSunsetModal
            isOpen={isAsistenciaSunsetOpen}
            onClose={() => setIsAsistenciaSunsetOpen(false)}
            onShowToast={showToast}
          />

          {/* 4f. Modal: Registro Diario Hotel Pumilio (Exact match with user screenshot) */}
          <RegistroPumilioModal
            isOpen={isRegistroPumilioOpen}
            onClose={() => setIsRegistroPumilioOpen(false)}
            onShowToast={showToast}
          />

          {/* 4g. Modal: Staff Cima Real (Exact match with user screenshot) */}
          <StaffCimaRealModal
            isOpen={isStaffCimaRealOpen}
            onClose={() => setIsStaffCimaRealOpen(false)}
            onShowToast={showToast}
          />

          {/* 4i. Modal: Crear Nota (Strictly confined inside mobile phone shell) */}
          <CreateNoteModal
            isOpen={isCreateNoteOpen}
            onClose={() => setIsCreateNoteOpen(false)}
            onSave={handleSaveNewNote}
            onShowToast={showToast}
          />

          {/* 5. Modal: Lista de Condominios y Unidades */}
          {isCondosModalOpen && (
            <div
              onClick={() => setIsCondosModalOpen(false)}
              className="absolute inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm p-0 animate-in fade-in overflow-hidden"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full bg-[#18191d] border-t border-[#2f323c] rounded-t-3xl h-[90%] max-h-[90%] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-200"
              >
                <div className="w-12 h-1.5 bg-slate-600/50 rounded-full mx-auto mt-2.5 mb-1 shrink-0" />
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#272a33] shrink-0">
                  <div>
                    <h3 className="text-sm font-bold text-white">Condominios y Residenciales</h3>
                    <span className="text-[11px] text-slate-400">9 condominios · 171 unidades habitacionales</span>
                  </div>
                  <button
                    onClick={() => setIsCondosModalOpen(false)}
                    className="w-8 h-8 rounded-full bg-[#23262e] border border-[#323642] flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 space-y-2 flex-1 overflow-y-auto overscroll-contain touch-pan-y scrollbar-thin">
                  {condominiums.map((c, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-[#131418] border border-[#252830] flex items-center justify-between"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-white">{c.name}</h4>
                        <span className="text-[11px] text-slate-400">{c.location} · {c.status}</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-[#1f2128] text-xs font-mono font-semibold text-red-400 border border-[#2f323e]">
                        {c.units} unidades
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 6. Modal: Turno & Perfil Fabian */}
          {isShiftModalOpen && (
            <div
              onClick={() => setIsShiftModalOpen(false)}
              className="absolute inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm p-0 animate-in fade-in overflow-hidden"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full bg-[#18191d] border-t border-[#2f323c] rounded-t-3xl h-[92%] max-h-[92%] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-200"
              >
                <div className="w-12 h-1.5 bg-slate-600/50 rounded-full mx-auto mt-2.5 mb-1 shrink-0" />
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#272a33] shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-800 text-emerald-100 flex items-center justify-center font-bold text-sm">
                      F
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Fabian (Supervisor STS)</h3>
                      <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Sesión activa
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsShiftModalOpen(false)}
                    className="w-8 h-8 rounded-full bg-[#23262e] border border-[#323642] flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 space-y-3.5 flex-1 overflow-y-auto overscroll-contain touch-pan-y scrollbar-thin text-xs">
                  <div className="p-3.5 rounded-xl bg-[#131418] border border-[#272a33] space-y-2">
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Inicio de turno:</span>
                      <span className="font-semibold text-white">Hoy, 06:00 AM</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Tiempo en guardia:</span>
                      <span className="font-semibold text-emerald-400">2h 14m</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Condominio asignado:</span>
                      <span className="font-semibold text-white">Supervisor General (Todos)</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <button
                      onClick={() => {
                        setShiftStarted(!shiftStarted);
                        showToast(shiftStarted ? 'Turno finalizado con éxito' : 'Turno iniciado como Fabian');
                        setIsShiftModalOpen(false);
                      }}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        shiftStarted
                          ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-md'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                      }`}
                    >
                      {shiftStarted ? 'Finalizar Turno Actual' : 'Iniciar Mi Turno Ahora'}
                    </button>

                    <button
                      onClick={() => {
                        setIsShiftModalOpen(false);
                        setIsNotesOpen(true);
                      }}
                      className="w-full py-2.5 rounded-xl bg-[#22242c] text-slate-300 text-xs font-semibold hover:bg-[#2c2f3a] cursor-pointer"
                    >
                      Dejar Consigna para el Relevo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 7. Modal: Quick Action Dialog */}
          {activeQuickAction && (
            <div
              onClick={() => setActiveQuickAction(null)}
              className="absolute inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm p-0 animate-in fade-in overflow-hidden"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full bg-[#18191d] border-t border-[#2f323c] rounded-t-3xl h-[88%] max-h-[88%] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-200"
              >
                <div className="w-12 h-1.5 bg-slate-600/50 rounded-full mx-auto mt-2.5 mb-1 shrink-0" />
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#272a33] shrink-0">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    {activeQuickAction.title}
                  </h3>
                  <button
                    onClick={() => setActiveQuickAction(null)}
                    className="w-8 h-8 rounded-full bg-[#23262e] border border-[#323642] flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 space-y-3 flex-1 overflow-y-auto overscroll-contain touch-pan-y scrollbar-thin">
                  <p className="text-xs text-slate-300">
                    Módulo de garita rápido para <span className="font-bold text-white">{activeQuickAction.title}</span>. Selecciona la acción a ejecutar:
                  </p>

                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setActiveQuickAction(null);
                        setIsNewRecordOpen(true);
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>Registrar Ingreso en {activeQuickAction.title}</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveQuickAction(null);
                        setIsXeomaOpen(true);
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#22252e] hover:bg-[#2b2f3a] text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 border border-[#313543] cursor-pointer"
                    >
                      <Video className="w-4 h-4 text-cyan-400" />
                      <span>Ver Cámara Xeoma de esta ubicación</span>
                    </button>

                    <button
                      onClick={() => {
                        showToast(`Asistencia confirmada para personal de ${activeQuickAction.title}`);
                        setActiveQuickAction(null);
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#172620] hover:bg-[#1e342b] text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 border border-[#234235] cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Marcar Asistencia de Oficiales</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
