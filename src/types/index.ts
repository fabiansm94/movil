export interface AuthorizedPerson {
  id: string;
  cedula: string;
  fullName: string;
  type: 'Propietario' | 'Familiar' | 'Visitante Frecuente' | 'Proveedor' | 'Servicio' | 'Renta Vacacional';
  condoName: string;
  unitNumber: string;
  licensePlate: string;
  vehicleModel?: string;
  vehicleColor?: string;
  phone: string;
  status: 'Activo' | 'Restringido' | 'Pendiente';
  notes?: string;
  validUntil?: string;
  photoUrl?: string;
  lastAccess?: string;
}

export interface RentalGuest {
  id: string;
  guestName: string;
  platform: 'Airbnb' | 'Booking' | 'Directo' | 'VRBO';
  condoName: string;
  unitNumber: string;
  checkIn: string;
  checkOut: string;
  paxCount: number;
  licensePlate?: string;
  status: 'Confirmado' | 'En Estadía' | 'Completado';
  emergencyContact: string;
}

export interface GuardUser {
  id: string;
  name: string;
  initial: string;
  role: 'Supervisor' | 'Oficial de Seguridad' | 'Monitoreo STS';
  condo: string;
  online: boolean;
  shiftStart: string;
  avatarColor: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  location: string;
  badge?: string;
  type: 'policia' | 'bomberos' | 'ambulancia' | 'soporte';
}

export interface DailyNote {
  id: string;
  title?: string;
  content: string;
  priority: 'alta' | 'media' | 'baja';
  author: string;
  timestamp: string;
  readByFabian: boolean;
}

export interface SupportTicket {
  id: number;
  title: string;
  type: 'bug' | 'idea' | 'request';
  status: 'Abierto' | 'Aprobado y cerrado' | 'En revisión';
  priority: 'Alta' | 'Media' | 'Baja';
  author: string;
  date: string;
  description?: string;
}

export type MobileTab = 'inicio' | 'notas' | 'registros' | 'monitoreo' | 'procedimientos' | 'policia' | 'mas';
export type DevicePreviewMode = 'responsive' | 'ios' | 'android';
