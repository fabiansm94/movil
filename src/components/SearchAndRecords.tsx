import React, { useState } from 'react';
import {
  Search,
  CreditCard,
  UserPlus,
  Car,
  Home,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react';
import { AuthorizedPerson, RentalGuest } from '../types';

interface Props {
  authorizedList: AuthorizedPerson[];
  rentalsList: RentalGuest[];
  onSelectPerson: (person: AuthorizedPerson) => void;
  onSelectRental: (rental: RentalGuest) => void;
  onOpenNewRental: () => void;
  activeSelectedPersonId?: string;
}

export const SearchAndRecords: React.FC<Props> = ({
  authorizedList,
  rentalsList,
  onSelectPerson,
  onSelectRental,
  onOpenNewRental,
  activeSelectedPersonId
}) => {
  const [activeTab, setActiveTab] = useState<'registros' | 'rentas'>('registros');
  const [cedulaQuery, setCedulaQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('todos');

  // Filter logic for authorized persons
  const filteredAuthorized = authorizedList.filter((item) => {
    // Cedula filter
    if (cedulaQuery.trim() && !item.cedula.toLowerCase().includes(cedulaQuery.toLowerCase().trim())) {
      return false;
    }
    // General query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const match =
        item.fullName.toLowerCase().includes(q) ||
        item.cedula.toLowerCase().includes(q) ||
        item.condoName.toLowerCase().includes(q) ||
        item.unitNumber.toLowerCase().includes(q) ||
        item.licensePlate.toLowerCase().includes(q) ||
        (item.vehicleModel && item.vehicleModel.toLowerCase().includes(q));
      if (!match) return false;
    }
    // Type filter
    if (typeFilter !== 'todos' && item.type.toLowerCase() !== typeFilter.toLowerCase()) {
      return false;
    }
    return true;
  });

  // Filter logic for rentals
  const filteredRentals = rentalsList.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.guestName.toLowerCase().includes(q) ||
      item.condoName.toLowerCase().includes(q) ||
      item.unitNumber.toLowerCase().includes(q) ||
      (item.licensePlate && item.licensePlate.toLowerCase().includes(q))
    );
  });

  const isSearchActive = cedulaQuery.trim().length > 0 || searchQuery.trim().length > 0 || typeFilter !== 'todos';

  const clearAllFilters = () => {
    setCedulaQuery('');
    setSearchQuery('');
    setTypeFilter('todos');
  };

  return (
    <div className="bg-[#18191d] rounded-2xl border border-[#272a32] p-3 sm:p-4 shadow-md space-y-3.5">
      {/* Top Tabs: Registros vs Registro de rentas (with responsive font and truncation) */}
      <div className="flex items-center gap-1.5 p-1 bg-[#121316] rounded-xl border border-[#24272e]">
        <button
          onClick={() => setActiveTab('registros')}
          className={`flex-1 min-w-0 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-[11px] sm:text-xs font-semibold transition-all ${
            activeTab === 'registros'
              ? 'bg-[#e14c4c] text-white shadow-md shadow-red-950/50 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Search className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Registros</span>
        </button>

        <button
          onClick={() => setActiveTab('rentas')}
          className={`flex-1 min-w-0 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-[11px] sm:text-xs font-semibold transition-all ${
            activeTab === 'rentas'
              ? 'bg-[#e14c4c] text-white shadow-md shadow-red-950/50 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <UserPlus className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Registro de rentas</span>
        </button>
      </div>

      {activeTab === 'registros' ? (
        <>
          {/* Inputs Section */}
          <div className="space-y-2">
            {/* Input 1: Consultar cédula */}
            <div className="relative">
              <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={cedulaQuery}
                onChange={(e) => setCedulaQuery(e.target.value)}
                placeholder="Consultar cédula... (ej. 1-1452-0988)"
                className="w-full pl-9 pr-8 py-2 bg-[#121316] border border-[#2b2e37] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#e14c4c] transition-colors"
              />
              {cedulaQuery && (
                <button
                  onClick={() => setCedulaQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Input 2: Buscar cualquier nombre, dato o registro */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar cualquier nombre, dato o registro..."
                className="w-full pl-9 pr-8 py-2 bg-[#121316] border border-[#2b2e37] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#e14c4c] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Results or Empty State */}
          {!isSearchActive ? (
            /* Screenshot Empty State Graphic */
            <div className="py-7 px-3 flex flex-col items-center justify-center text-center space-y-3 rounded-xl bg-[#121316]/60 border border-[#22242b] border-dashed">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute w-12 h-12 rounded-full bg-purple-900/40 blur-md" />
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-purple-700/60 flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                </div>
                <div className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full bg-purple-800/80 flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                </div>
                <div className="relative w-11 h-11 rounded-xl bg-[#0e7490] border border-cyan-400/40 flex items-center justify-center shadow-lg shadow-cyan-950/60">
                  <Search className="w-5 h-5 text-cyan-100" />
                </div>
              </div>

              <div className="max-w-xs space-y-1">
                <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-normal">
                  Busca autorizados ingresando el <span className="text-white font-medium">nombre</span> del autorizado, la <span className="text-white font-medium">casa que visita</span>, número de <span className="text-white font-medium">placa</span> o número de <span className="text-white font-medium">identificación</span>.
                </p>
              </div>

              {/* Quick shortcut chips */}
              <div className="pt-1 flex flex-wrap justify-center gap-1.5">
                <button
                  onClick={() => setSearchQuery('Foresta')}
                  className="px-2 py-0.5 rounded-md bg-[#1f2127] text-slate-300 text-[10px] hover:text-white border border-[#2d3039]"
                >
                  Condominio Foresta
                </button>
                <button
                  onClick={() => setCedulaQuery('1-1452-0988')}
                  className="px-2 py-0.5 rounded-md bg-[#1f2127] text-slate-300 text-[10px] hover:text-white border border-[#2d3039]"
                >
                  1-1452-0988
                </button>
                <button
                  onClick={() => setSearchQuery('BTY-402')}
                  className="px-2 py-0.5 rounded-md bg-[#1f2127] text-slate-300 text-[10px] hover:text-white border border-[#2d3039]"
                >
                  Placa BTY-402
                </button>
                <button
                  onClick={() => setSearchQuery('Pumilio')}
                  className="px-2 py-0.5 rounded-md bg-[#1f2127] text-slate-300 text-[10px] hover:text-white border border-[#2d3039]"
                >
                  Hotel Pumilio
                </button>
              </div>
            </div>
          ) : (
            /* Results List - No artificial max-height cut-off! */
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 px-0.5">
                <span>{filteredAuthorized.length} registro(s) encontrado(s)</span>
                <button
                  onClick={clearAllFilters}
                  className="text-red-400 hover:text-red-300 text-[11px] underline"
                >
                  Limpiar búsqueda
                </button>
              </div>

              {filteredAuthorized.length === 0 ? (
                <div className="p-5 text-center rounded-xl bg-[#121316] border border-[#22242b] text-slate-400 text-xs space-y-1.5">
                  <AlertCircle className="w-7 h-7 text-amber-500/80 mx-auto" />
                  <p className="font-semibold text-slate-200">No se encontraron autorizados</p>
                  <p className="text-[11px]">Verifica los datos o crea un registro de ingreso temporal.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredAuthorized.map((person) => {
                    const isSelected = activeSelectedPersonId === person.id;
                    return (
                      <div
                        key={person.id}
                        onClick={() => onSelectPerson(person)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all active:scale-[0.99] ${
                          isSelected
                            ? 'bg-[#261f21] border-red-500/60 shadow-md ring-1 ring-red-500/40'
                            : 'bg-[#131418] border-[#252830] hover:border-[#383c48]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-xs text-white truncate max-w-[190px]">
                                {person.fullName}
                              </span>
                              <span
                                className={`text-[9px] font-semibold px-1.5 py-0.2 rounded shrink-0 ${
                                  person.status === 'Activo'
                                    ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/40'
                                    : 'bg-red-950/80 text-red-400 border border-red-800/40'
                                }`}
                              >
                                {person.status}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-400 font-mono block">
                              Cédula: {person.cedula}
                            </span>
                          </div>

                          <span className="text-[9px] uppercase font-semibold text-slate-300 bg-[#1f2127] px-1.5 py-0.5 rounded border border-[#2e313a] shrink-0">
                            {person.type}
                          </span>
                        </div>

                        {/* Location and vehicle */}
                        <div className="mt-2 pt-2 border-t border-[#1e2026] flex items-center justify-between gap-2 text-[11px]">
                          <div className="flex items-center gap-1.5 min-w-0 flex-1 truncate text-slate-300">
                            <Home className="w-3.5 h-3.5 text-red-400 shrink-0" />
                            <span className="truncate">{person.condoName}</span>
                            <span className="text-slate-500 shrink-0">·</span>
                            <span className="text-slate-200 font-semibold shrink-0">{person.unitNumber}</span>
                          </div>

                          <div className="flex items-center gap-1 bg-[#1c1e24] px-1.5 py-0.5 rounded border border-[#2a2d36] font-mono font-semibold text-[10px] text-amber-300 shrink-0">
                            <Car className="w-3 h-3" />
                            <span>{person.licensePlate}</span>
                          </div>
                        </div>

                        <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400">
                          <span className="flex items-center gap-1 truncate max-w-[180px]">
                            <Clock className="w-3 h-3 text-slate-500 shrink-0" />
                            <span className="truncate">Último: {person.lastAccess || 'Hoy'}</span>
                          </span>
                          <span className="text-red-400 font-medium flex items-center gap-0.5 shrink-0">
                            Ver detalles <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        /* Registro de Rentas (Airbnb / Booking) */
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-300 font-medium">Huéspedes de renta activa</span>
            <button
              onClick={onOpenNewRental}
              className="text-xs text-red-400 hover:text-red-300 font-medium flex items-center gap-1"
            >
              <UserPlus className="w-3 h-3" />
              <span>Registrar Huésped</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar huésped, casa o placa..."
              className="w-full pl-9 pr-4 py-2 bg-[#121316] border border-[#2b2e37] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#e14c4c]"
            />
          </div>

          <div className="space-y-2">
            {filteredRentals.map((rental) => (
              <div
                key={rental.id}
                onClick={() => onSelectRental(rental)}
                className="p-3 rounded-xl bg-[#131418] border border-[#252830] hover:border-slate-600 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-xs text-white truncate">{rental.guestName}</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800/40 shrink-0">
                        {rental.platform}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 truncate block">
                      {rental.condoName} - {rental.unitNumber}
                    </span>
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-emerald-950 text-emerald-300 border border-emerald-800 shrink-0">
                    {rental.status}
                  </span>
                </div>

                <div className="mt-2 pt-2 border-t border-[#1e2026] flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate">📅 In: {rental.checkIn}</span>
                  <span className="shrink-0">Out: {rental.checkOut}</span>
                </div>

                <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Pax: {rental.paxCount} personas</span>
                  <span className="text-red-400 font-medium">Ver autorización →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
