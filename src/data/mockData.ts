import { AuthorizedPerson, RentalGuest, GuardUser, EmergencyContact, DailyNote, SupportTicket } from '../types';

export const INITIAL_AUTHORIZED: AuthorizedPerson[] = [
  {
    id: 'rec-1',
    cedula: '1-1452-0988',
    fullName: 'Carlos Alberto Mora Vargas',
    type: 'Familiar',
    condoName: 'Condominio Foresta',
    unitNumber: 'Casa 42',
    licensePlate: 'CL-892134',
    vehicleModel: 'Toyota RAV4 Gris Plomo',
    vehicleColor: 'Gris Plomo',
    phone: '+506 8834-1120',
    status: 'Activo',
    notes: 'Autorizado permanente por el propietario Javier Mora. Acceso con control remoto o garita.',
    validUntil: '31/12/2026',
    lastAccess: 'Hoy, 06:45 AM'
  },
  {
    id: 'rec-2',
    cedula: '3-0452-0199',
    fullName: 'María Fernanda Vega Solís',
    type: 'Propietario',
    condoName: 'Condominio Sunset Hills',
    unitNumber: 'Casa 15',
    licensePlate: 'BTY-402',
    vehicleModel: 'Hyundai Tucson Blanco',
    vehicleColor: 'Blanco',
    phone: '+506 8701-4452',
    status: 'Activo',
    notes: 'Propietaria residente. Tag vehicular #7741 asignado.',
    validUntil: 'Indefinido',
    lastAccess: 'Ayer, 08:30 PM'
  },
  {
    id: 'rec-3',
    cedula: '1-0899-0312',
    fullName: 'Jorge Eduardo Rodríguez Quirós',
    type: 'Visitante Frecuente',
    condoName: 'Hotel Pumilio',
    unitNumber: 'Suite Ejecutiva 104',
    licensePlate: 'P-552910',
    vehicleModel: 'Suzuki Vitara Azul',
    vehicleColor: 'Azul',
    phone: '+506 7012-9988',
    status: 'Activo',
    notes: 'Huésped corporativo autorizado por recepción. Permiso de parqueo #4.',
    validUntil: '22/10/2026',
    lastAccess: 'Hoy, 07:12 AM'
  },
  {
    id: 'rec-4',
    cedula: '2-0678-0341',
    fullName: 'Roberto Brenes Castro (STS Técnicos)',
    type: 'Servicio',
    condoName: 'Condominio Cima Real',
    unitNumber: 'Garita & Perímetro',
    licensePlate: 'STS-018',
    vehicleModel: 'Nissan Frontier Rotulado STS',
    vehicleColor: 'Blanco / Azul',
    phone: '+506 2200-8800',
    status: 'Activo',
    notes: 'Mantenimiento preventivo de cámaras Xeoma y sensores de cerca eléctrica.',
    validUntil: '19/10/2026 18:00',
    lastAccess: 'Hoy, 07:45 AM'
  },
  {
    id: 'rec-5',
    cedula: '1-1823-0492',
    fullName: 'Adriana Villalobos Jiménez',
    type: 'Propietario',
    condoName: 'Condominio Foresta',
    unitNumber: 'Casa 12',
    licensePlate: 'ABC-123',
    vehicleModel: 'Honda CR-V Rojo',
    vehicleColor: 'Rojo cereza',
    phone: '+506 8888-2345',
    status: 'Activo',
    notes: 'Alquila por Airbnb ocasionalmente. Notifica visitas por la app.',
    validUntil: 'Indefinido',
    lastAccess: '18/10/2026'
  },
  {
    id: 'rec-6',
    cedula: '6-0312-0789',
    fullName: 'Esteban Morales Gómez (Reparto Rápido)',
    type: 'Proveedor',
    condoName: 'Condominio Sunset Hills',
    unitNumber: 'Casa 08',
    licensePlate: 'MOT-7821',
    vehicleModel: 'Motocicleta Honda XR 150',
    vehicleColor: 'Negra',
    phone: '+506 6012-3456',
    status: 'Restringido',
    notes: 'Ingreso únicamente a pie tras dejar documento de identidad en garita.',
    validUntil: '19/10/2026',
    lastAccess: '15/10/2026'
  }
];

export const INITIAL_RENTALS: RentalGuest[] = [
  {
    id: 'rent-1',
    guestName: 'Sofía Valverde & Familia',
    platform: 'Airbnb',
    condoName: 'Condominio Foresta',
    unitNumber: 'Casa 12',
    checkIn: '18/10/2026 (15:00)',
    checkOut: '22/10/2026 (11:00)',
    paxCount: 4,
    licensePlate: 'P-941203',
    status: 'En Estadía',
    emergencyContact: '+506 8345-9012'
  },
  {
    id: 'rent-2',
    guestName: 'Marcus Miller (USA)',
    platform: 'Booking',
    condoName: 'Hotel Pumilio',
    unitNumber: 'Bungalow 03',
    checkIn: '19/10/2026 (14:00)',
    checkOut: '25/10/2026 (12:00)',
    paxCount: 2,
    licensePlate: 'Rent-A-Car Alamo #12',
    status: 'Confirmado',
    emergencyContact: '+1 415-890-1200'
  },
  {
    id: 'rent-3',
    guestName: 'Lucía Méndez Campos',
    platform: 'Directo',
    condoName: 'Condominio Sunset Hills',
    unitNumber: 'Casa 27',
    checkIn: '17/10/2026 (12:00)',
    checkOut: '20/10/2026 (10:00)',
    paxCount: 3,
    licensePlate: 'BBC-904',
    status: 'En Estadía',
    emergencyContact: '+506 8812-7744'
  }
];

export const POLICE_CONTACTS: EmergencyContact[] = [
  {
    id: 'pol-1',
    name: 'Policía Municipal Escazú',
    phone: '25880270',
    location: 'Escazu, San José',
    badge: 'Delegación Central Escazú',
    type: 'policia'
  },
  {
    id: 'pol-2',
    name: 'Policía Municipal Pavas',
    phone: '2547-6020',
    location: 'Pavas, San José',
    badge: 'Sector Industrial & Residencial',
    type: 'policia'
  },
  {
    id: 'pol-3',
    name: 'Policía Municipal Santa Ana',
    phone: '25820859',
    location: 'Santa Ana, San José',
    badge: 'Garita Pozos / Lindora',
    type: 'policia'
  },
  {
    id: 'pol-4',
    name: 'Emergencias Nacionales 9-1-1',
    phone: '911',
    location: 'Nacional Costa Rica',
    badge: 'Central Operativa',
    type: 'policia'
  },
  {
    id: 'pol-5',
    name: 'Central Monitoreo STS Soporte',
    phone: '2289-4000',
    location: 'Soporte Técnico 24/7',
    badge: 'Operador de Turno STS',
    type: 'soporte'
  }
];

export const GUARD_USERS: GuardUser[] = [
  {
    id: 'usr-1',
    name: 'Fabian',
    initial: 'F',
    role: 'Supervisor',
    condo: 'Sin condominio',
    online: true,
    shiftStart: '06:00 AM',
    avatarColor: 'bg-emerald-800 text-emerald-200'
  },
  {
    id: 'usr-2',
    name: 'Kevin',
    initial: 'K',
    role: 'Oficial de Seguridad',
    condo: 'Sin condominio',
    online: true,
    shiftStart: '07:00 AM',
    avatarColor: 'bg-teal-900 text-teal-300'
  },
  {
    id: 'usr-3',
    name: 'Angelo',
    initial: 'A',
    role: 'Monitoreo STS',
    condo: 'Sin condominio',
    online: true,
    shiftStart: '06:30 AM',
    avatarColor: 'bg-emerald-900 text-emerald-300'
  },
  {
    id: 'usr-4',
    name: 'Angelo (Apoyo)',
    initial: 'A',
    role: 'Oficial de Seguridad',
    condo: 'Sin condominio',
    online: true,
    shiftStart: '07:30 AM',
    avatarColor: 'bg-emerald-950 text-emerald-400'
  }
];

export const DAILY_NOTES: DailyNote[] = [
  {
    id: 'note-1',
    title: 'Mantenimiento portón eléctrico Foresta',
    content: 'De 09:00 a 11:30 el portón vehicular derecho de Foresta estará en modo manual por cambio de cremallera. Verificar cédulas manualmente.',
    priority: 'alta',
    author: 'Supervisor STS',
    timestamp: 'Hoy, 06:15 AM',
    readByFabian: true
  },
  {
    id: 'note-2',
    title: 'Evento social en Casa Club Sunset',
    content: 'Casa 18 tiene reserva autorizada para 15 invitados entre 14:00 y 20:00. Lista de invitados precargada en módulo de registros.',
    priority: 'media',
    author: 'Administración',
    timestamp: 'Ayer, 05:40 PM',
    readByFabian: false
  },
  {
    id: 'note-3',
    title: 'Instalación de cámaras Xeoma en Pumilio',
    content: 'Técnicos de STS ingresarán a las 10:00 AM para enlazar las 3 nuevas cámaras del sendero posterior al servidor central.',
    priority: 'media',
    author: 'Soporte Tecs',
    timestamp: 'Hoy, 07:00 AM',
    readByFabian: false
  }
];

export const XEOMA_CAMERAS = [
  {
    id: 'cam-1',
    name: 'CAM 01 - Garita Acceso Principal',
    condo: 'Condominio Foresta',
    status: 'ONLINE',
    fps: 30,
    res: '1080p',
    location: 'Portón Norte',
    type: 'LPR (Placas)',
    motionAlert: false,
    color: 'from-blue-950 to-slate-950'
  },
  {
    id: 'cam-2',
    name: 'CAM 02 - Garita & Placas',
    condo: 'Condominio Sunset Hills',
    status: 'ONLINE',
    fps: 25,
    res: '4K UHD',
    location: 'Garita Peatonal & Vehicular',
    type: 'Reconocimiento Facial',
    motionAlert: true,
    color: 'from-emerald-950 to-slate-950'
  },
  {
    id: 'cam-3',
    name: 'CAM 03 - Parqueo Huéspedes',
    condo: 'Hotel Pumilio',
    status: 'ONLINE',
    fps: 30,
    res: '1080p',
    location: 'Bungalows Frontales',
    type: 'Infrarrojo Nocturno',
    motionAlert: false,
    color: 'from-amber-950 to-slate-950'
  },
  {
    id: 'cam-4',
    name: 'CAM 04 - Muro Perimetral Oeste',
    condo: 'Condominio Cima Real',
    status: 'ONLINE',
    fps: 25,
    res: '1080p',
    location: 'Sensor Cerca Eléctrica #4',
    type: 'Detección Térmica',
    motionAlert: false,
    color: 'from-purple-950 to-slate-950'
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 17,
    title: 'No sirven las notas personales',
    type: 'bug',
    status: 'Abierto',
    priority: 'Alta',
    author: 'Sebastian',
    date: '17 oct 02:55',
    description: 'Al intentar guardar notas personales en el turno de la madrugada, se queda cargando y no se reflejan en el panel.'
  },
  {
    id: 14,
    title: 'Permanencia de sesión activa',
    type: 'bug',
    status: 'Aprobado y cerrado',
    priority: 'Media',
    author: 'Jeremy',
    date: '9 sep 16:35',
    description: 'Se requería que la sesión permanezca abierta durante turnos largos de 12 horas sin desloguear.'
  },
  {
    id: 13,
    title: 'No nos permite crear notas',
    type: 'bug',
    status: 'Aprobado y cerrado',
    priority: 'Alta',
    author: 'Jeremy',
    date: '23 ago 23:26',
    description: 'El botón de guardar notas arrojaba error de red temporal en la garita.'
  },
  {
    id: 12,
    title: 'Captura de asistecias',
    type: 'idea',
    status: 'Aprobado y cerrado',
    priority: 'Media',
    author: 'Juan Carlos',
    date: '18 ago 16:41',
    description: 'Solicitud para registrar la hora exacta de entrada y salida de los oficiales en la tablet.'
  },
  {
    id: 11,
    title: 'No nos poermite ingresar staff en Cima Real',
    type: 'bug',
    status: 'Aprobado y cerrado',
    priority: 'Alta',
    author: 'Jeremy',
    date: '6 ago 08:53',
    description: 'Validación de cédulas de mantenimiento en Cima Real bloqueada por filtro de condominio.'
  },
  {
    id: 9,
    title: 'Errores de sesion',
    type: 'bug',
    status: 'Aprobado y cerrado',
    priority: 'Alta',
    author: 'Jeremy',
    date: '5 ago 12:33',
    description: 'Conflicto cuando dos oficiales ingresaban con el mismo usuario supervisor simultáneamente.'
  },
  {
    id: 8,
    title: 'Editar Registro Diario Mana',
    type: 'request',
    status: 'Aprobado y cerrado',
    priority: 'Baja',
    author: 'Kendal',
    date: '1 ago 00:22',
    description: 'Permitir editar la bitácora diaria dentro de los primeros 10 minutos tras registrarla.'
  },
  {
    id: 7,
    title: 'Cedulas en Mana',
    type: 'idea',
    status: 'Aprobado y cerrado',
    priority: 'Media',
    author: 'Angelo',
    date: '1 ago 00:21',
    description: 'Autocompletar formato de cédulas de Costa Rica con guiones automáticos.'
  }
];
