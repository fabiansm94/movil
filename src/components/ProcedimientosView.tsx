import React, { useState } from 'react';
import {
  ClipboardList,
  Search,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Clock,
  Copy,
  Check
} from 'lucide-react';

interface ProcedureItem {
  id: string;
  code: string;
  title: string;
  category: 'Acceso' | 'Emergencia' | 'Paquetería' | 'Rondas' | 'Obras';
  importance: 'Crítico' | 'Estándar' | 'Informativo';
  timeEstimate: string;
  summary: string;
  steps: string[];
  rules: string[];
  emergencyContact?: string;
}

const PROCEDURES_DATA: ProcedureItem[] = [
  {
    id: 'sop-1',
    code: 'SOP-ACC-01',
    title: 'Protocolo de Ingreso Vehicular y Peatonal',
    category: 'Acceso',
    importance: 'Crítico',
    timeEstimate: '1 a 2 min',
    summary: 'Verificación estricta de identidad para todo ingreso ajeno a propietarios registrados.',
    steps: [
      'Solicitar documento de identidad físico (Cédula nacional, DIMEX o Pasaporte vigente).',
      'Verificar si el visitante o vehículo se encuentra en la lista autorizada del condominio.',
      'Si no está registrado, llamar a la residencia por intercomunicador o teléfono autorizado.',
      'Registrar la placa, nombre completo, hora de entrada y número de unidad de destino.',
      'Entregar gafete/tarjeta de visitante e indicar la velocidad máxima permitida (20 km/h).'
    ],
    rules: [
      'PROHIBIDO permitir el ingreso sin autorización expresa del residente o administrador.',
      'Bajo ninguna circunstancia abrir el portón a vehículos con placas ocultas o adulteradas.',
      'Todo servicio de grúa o mudanza requiere aviso previo con 24 horas de anticipación.'
    ]
  },
  {
    id: 'sop-2',
    code: 'SOP-DEL-02',
    title: 'Protocolo de Repartidores y Delivery',
    category: 'Paquetería',
    importance: 'Estándar',
    timeEstimate: '3 a 5 min',
    summary: 'Procedimiento de control para UberEats, PedidosYa, mensajería y encomiendas.',
    steps: [
      'Detener la motocicleta o vehículo en la bahía designada frente a garita.',
      'Solicitar cédula del repartidor y verificar en app el número de pedido y destinatario.',
      'Llamar al residente para confirmar si autoriza el ingreso a la puerta o si baja a garita.',
      'Si ingresa, retener documento de identidad y entregar gafete de proveedor temporal.',
      'Fijar un tiempo máximo de permanencia de 15 minutos en el condominio.'
    ],
    rules: [
      'No se permite el ingreso de repartidores en horas posteriores a las 22:00 sin previa notificación.',
      'Revisar que la mochila térmica o cajón no contenga objetos sospechosos.'
    ]
  },
  {
    id: 'sop-3',
    code: 'SOP-EMG-03',
    title: 'Protocolo de Código Rojo / Emergencia Policial',
    category: 'Emergencia',
    importance: 'Crítico',
    timeEstimate: 'Inmediato',
    summary: 'Activación de respuesta ante intrusión perimetral, asalto o riesgo inminente.',
    steps: [
      'Presionar el botón de pánico de la garita para alertar a la Central de Monitoreo STS.',
      'Realizar llamada directa al cuadrante de la Policía Municipal o 911 indicando la ubicación exacta.',
      'Cerrar y bloquear portones vehiculares y accesos peatonales (Modo Bloqueo Garita).',
      'Observar cámaras de CCTV Xeoma para localizar la posición del sospechoso y registrar detalles.',
      'Mantenerse a cubierto dentro de garita armada; no confrontar en solitario si hay armas de fuego.'
    ],
    rules: [
      'Prioridad absoluta: salvaguardar la vida humana y la integridad de los oficiales y residentes.',
      'No abandonar la garita hasta que se hagan presentes los refuerzos policiales.'
    ],
    emergencyContact: '911 / Policía Municipal: 2282-3255 / Central STS: 2200-8800'
  },
  {
    id: 'sop-4',
    code: 'SOP-RON-04',
    title: 'Protocolo de Rondas y Monitoreo Perimetral',
    category: 'Rondas',
    importance: 'Estándar',
    timeEstimate: '45 min por ronda',
    summary: 'Verificación sistemática de puntos ciegos, cercas eléctricas e iluminación.',
    steps: [
      'Notificar a la Central de Monitoreo antes de iniciar el recorrido perimetral.',
      'Portar radio transmisor con batería completa, foco táctil de alta potencia y bastón reglamentario.',
      'Escanear los puntos de control QR / RFID ubicados en los sectores norte, sur, este y oeste.',
      'Verificar tensión de alambre navaja y sensores infrarrojos perimetrales.',
      'Reportar de inmediato cualquier luminaria quemada o anomalía en la bitácora digital.'
    ],
    rules: [
      'Las rondas deben realizarse en horarios aleatorios cada 45 a 60 minutos.',
      'Nunca realizar la ronda sin haber dejado otro oficial a cargo en garita o el portón bloqueado.'
    ]
  },
  {
    id: 'sop-5',
    code: 'SOP-OBR-05',
    title: 'Protocolo de Cuadrillas de Construcción y Contratistas',
    category: 'Obras',
    importance: 'Estándar',
    timeEstimate: '5 min',
    summary: 'Normativa para ingreso y salida de maestros de obra, peones y camiones de materiales.',
    steps: [
      'El horario de labores en obra es exclusivamente de lunes a viernes de 07:00 a 17:00.',
      'Cotejar al personal obrero con el registro de "Staff Cima Real" o la lista aprobada por el ingeniero.',
      'Revisar herramientas pesadas (taladros, generadores, pulidoras) al ingreso y anotar en bitácora.',
      'Revisión visual al egreso para prevenir sustracción de materiales o herramientas.',
      'Los camiones de concreto o volteo deben ingresar por el carril asignado y salir antes de las 16:30.'
    ],
    rules: [
      'Prohibido el ingreso de personal de construcción con síntomas de alcohol o drogas.',
      'No se autorizan labores ruidosas los fines de semana ni días feriados sin permiso escrito de administración.'
    ]
  },
  {
    id: 'sop-6',
    code: 'SOP-MED-06',
    title: 'Protocolo de Emergencia Médica y Ambulancia',
    category: 'Emergencia',
    importance: 'Crítico',
    timeEstimate: 'Inmediato',
    summary: 'Facilitación de acceso urgente a Cruz Roja, soporte privado o unidades de paramédicos.',
    steps: [
      'Al recibir llamada de urgencia del residente, solicitar filial exacta y breve estado del paciente.',
      'Abrir inmediatamente el portón vehicular derecho y mantenerlo despejado de otros autos.',
      'Recibir a la ambulancia indicando con señas la ruta más rápida hacia la vivienda.',
      'Acompañar a los paramédicos si la situación lo requiere o mantener comunicación radial.'
    ],
    rules: [
      'NO exigir cédula ni detener a unidades de socorro con sirena encendida.',
      'Registrar hora de ingreso y salida una vez controlada la situación.'
    ],
    emergencyContact: 'Cruz Roja: 128 / Emergencias: 911'
  }
];

interface Props {
  onShowToast: (msg: string) => void;
}

export const ProcedimientosView: React.FC<Props> = ({ onShowToast }) => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('Todos');
  const [expandedId, setExpandedId] = useState<string | null>('sop-1');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['Todos', 'Acceso', 'Emergencia', 'Paquetería', 'Rondas', 'Obras'];

  const filtered = PROCEDURES_DATA.filter((p) => {
    if (selectedCat !== 'Todos' && p.category !== selectedCat) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.steps.some((s) => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleCopy = (proc: ProcedureItem) => {
    const text = `📋 *${proc.code} - ${proc.title}*\n⚠️ Nivel: ${proc.importance}\n📝 Resumen: ${proc.summary}\n\nPASOS:\n${proc.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nNORMAS:\n${proc.rules.map((r) => `• ${r}`).join('\n')}`;
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        setCopiedId(proc.id);
        setTimeout(() => setCopiedId(null), 2000);
        onShowToast('Protocolo copiado al portapapeles');
      }
    } catch {
      onShowToast('Protocolo copiado');
    }
  };

  return (
    <div className="space-y-3.5 pb-6">
      {/* Header */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#17181d] via-[#1c1d24] to-[#17181d] border border-[#2a2d38] shadow-md flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950/70 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
              Procedimientos Operativos
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </h2>
            <p className="text-[11px] text-slate-400">
              Protocolos de seguridad estándar STS para garitas
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-lg bg-[#20222a] border border-[#2c303c] text-[10px] font-bold text-emerald-400 shrink-0">
          6 SOPs Activos
        </span>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar protocolo por palabra clave, código o paso..."
          className="w-full bg-[#141519] border border-[#262832] focus:border-emerald-500/60 focus:outline-none rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs p-1"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px] -mx-1 px-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCat(c)}
            className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
              selectedCat === c
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'bg-[#17181d] border border-[#272a34] text-slate-400 hover:text-slate-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Procedures List */}
      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-[#141519] border border-[#242732] text-slate-400 text-xs">
            No se encontraron procedimientos para tu búsqueda.
          </div>
        ) : (
          filtered.map((proc) => {
            const isExpanded = expandedId === proc.id;
            const isCritical = proc.importance === 'Crítico';

            return (
              <div
                key={proc.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isExpanded
                    ? 'bg-[#16171d] border-[#383d4c] shadow-lg'
                    : 'bg-[#141519] border-[#242732] hover:border-[#2f3340]'
                }`}
              >
                {/* Accordion Header */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : proc.id)}
                  className="p-3.5 flex items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#20222a] text-slate-300 border border-[#2d3140]">
                        {proc.code}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-md border ${
                          isCritical
                            ? 'bg-red-950/60 border-red-500/40 text-red-400'
                            : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                        }`}
                      >
                        {proc.importance}
                      </span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {proc.timeEstimate}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-[13px] font-bold text-white tracking-tight leading-snug">
                      {proc.title}
                    </h3>

                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                      {proc.summary}
                    </p>
                  </div>

                  <div className="w-7 h-7 rounded-lg bg-[#20222a] border border-[#2d3140] flex items-center justify-center text-slate-400 shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-white" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>

                {/* Expanded Content: Steps and Rules */}
                {isExpanded && (
                  <div className="px-3.5 pb-4 pt-1 border-t border-[#22242e] space-y-3.5 animate-in fade-in duration-150">
                    {/* Summary Card */}
                    <div className="p-2.5 rounded-xl bg-[#1c1e26] border border-[#2a2d38] text-xs text-slate-300 leading-relaxed">
                      {proc.summary}
                    </div>

                    {/* Steps Checklist */}
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Pasos a seguir obligatorios
                      </span>
                      <div className="space-y-1.5">
                        {proc.steps.map((step, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 p-2 rounded-xl bg-[#121317] border border-[#222530] text-xs text-slate-200"
                          >
                            <span className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-snug">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Prohibitions & Rules */}
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Reglas estrictas y advertencias
                      </span>
                      <div className="space-y-1.5">
                        {proc.rules.map((rule, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 p-2 rounded-xl bg-amber-950/20 border border-amber-500/20 text-[11px] text-amber-200/90 leading-snug"
                          >
                            <span className="text-amber-400 shrink-0 font-bold">•</span>
                            <span>{rule}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Emergency Contact banner if exists */}
                    {proc.emergencyContact && (
                      <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/40 flex items-center gap-2 text-xs text-red-300">
                        <PhoneCall className="w-4 h-4 text-red-400 shrink-0" />
                        <span>
                          <strong>Línea directa:</strong> {proc.emergencyContact}
                        </span>
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="pt-1 flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleCopy(proc)}
                        className="px-3 py-1.5 rounded-xl bg-[#20222a] hover:bg-[#282b36] border border-[#2f3340] text-xs text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {copiedId === proc.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span>Copiar Protocolo</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
