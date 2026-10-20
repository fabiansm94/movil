import React, { useState, useRef } from 'react';
import {
  X,
  HardHat,
  Users,
  Plus,
  Camera,
  Search,
  Pencil,
  Trash2,
  User,
  Share2,
  Upload
} from 'lucide-react';

export interface StaffCimaMember {
  id: string;
  name: string;
  cedula: string;
  role: string;
  contact: string;
  photoUrl?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

const INITIAL_STAFF: StaffCimaMember[] = [
  {
    id: 'staff-1',
    name: 'Alexis Berrocal Carvajal',
    cedula: '',
    role: 'Muebles Alfacar',
    contact: ''
  },
  {
    id: 'staff-2',
    name: 'Alvaro De Jesus Montoya Gaitan',
    cedula: '',
    role: 'Construcción',
    contact: ''
  },
  {
    id: 'staff-3',
    name: 'Amin Abraham El Dahouk Barrios',
    cedula: '',
    role: 'Constructor',
    contact: 'jorge casa 15'
  },
  {
    id: 'staff-4',
    name: 'Andres ismael Gaitan',
    cedula: '155857581906',
    role: 'Construccion',
    contact: 'Omar'
  }
];

export const StaffCimaRealModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [staffList, setStaffList] = useState<StaffCimaMember[]>(INITIAL_STAFF);
  const [searchTerm, setSearchTerm] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [cedula, setCedula] = useState('');
  const [role, setRole] = useState('');
  const [contact, setContact] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        onShowToast('Foto cargada');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      onShowToast('Ingresa el nombre');
      return;
    }
    if (!role.trim()) {
      onShowToast('Ingresa el cargo');
      return;
    }

    if (editingId) {
      setStaffList((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: name.trim(),
                cedula: cedula.trim(),
                role: role.trim(),
                contact: contact.trim(),
                photoUrl: photoPreview || item.photoUrl
              }
            : item
        )
      );
      onShowToast(`Registro de ${name.trim()} actualizado`);
      setEditingId(null);
    } else {
      const newMember: StaffCimaMember = {
        id: `staff-${Date.now()}`,
        name: name.trim(),
        cedula: cedula.trim(),
        role: role.trim(),
        contact: contact.trim(),
        photoUrl: photoPreview || undefined
      };
      setStaffList((prev) => [newMember, ...prev]);
      onShowToast(`Miembro ${name.trim()} guardado`);
    }

    // Reset Form
    setName('');
    setCedula('');
    setRole('');
    setContact('');
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEdit = (member: StaffCimaMember) => {
    setEditingId(member.id);
    setName(member.name);
    setCedula(member.cedula || '');
    setRole(member.role);
    setContact(member.contact || '');
    setPhotoPreview(member.photoUrl || null);

    const input = document.getElementById('staff-name-input');
    if (input) input.focus();
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName('');
    setCedula('');
    setRole('');
    setContact('');
    setPhotoPreview(null);
  };

  const handleDelete = (id: string, memberName: string) => {
    setStaffList((prev) => prev.filter((m) => m.id !== id));
    if (editingId === id) {
      handleCancelEdit();
    }
    onShowToast(`Miembro ${memberName} eliminado`);
  };

  const handleShareReport = async () => {
    const reportText = [
      `👷‍♂️ *STAFF CONSTRUCCIÓN - CIMA REAL*`,
      `📅 *Fecha:* ${new Date().toLocaleDateString('es-CR')}`,
      `───────────────────────────────`,
      ...staffList.map(
        (m, i) =>
          `${i + 1}. *${m.name}* | Cargo: ${m.role} | Cédula: ${m.cedula || '—'} | Contacto: ${m.contact || '—'}`
      ),
      `───────────────────────────────`,
      `Total Personal: ${staffList.length} | STS Cima Real`
    ].join('\n');

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(reportText);
        onShowToast('¡Listado copiado al portapapeles!');
      } else {
        onShowToast('Listado generado');
      }
    } catch {
      onShowToast('Listado generado');
    }
  };

  const filteredStaff = staffList.filter((m) => {
    const term = searchTerm.toLowerCase();
    return (
      m.name.toLowerCase().includes(term) ||
      m.cedula.toLowerCase().includes(term) ||
      m.role.toLowerCase().includes(term) ||
      m.contact.toLowerCase().includes(term)
    );
  });

  return (
    <div
      onClick={onClose}
      className="absolute inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm p-0 animate-in fade-in overflow-hidden"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full bg-[#111216] border-t border-[#262833] rounded-t-2xl sm:rounded-t-3xl h-[95%] max-h-[95%] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-200"
      >
        {/* Handle bar */}
        <div className="w-10 h-1 bg-slate-600/50 rounded-full mx-auto mt-2 mb-1 shrink-0" />

        {/* Top Header */}
        <div className="px-3.5 py-2 flex items-center justify-between border-b border-[#20222a] shrink-0">
          <div className="flex items-center gap-2">
            <HardHat className="w-4 h-4 text-[#ea580c]" />
            <span className="text-xs sm:text-sm font-semibold text-white">
              Staff Cima Real
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleShareReport}
              title="Copiar listado"
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-[#20222a] transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-[#20222a] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Container with tight, screen-fitted spacing */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 overscroll-contain">
          {/* Main Title Header - Compact & Screen-Adjusted */}
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#f87171] shrink-0" />
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Staff Construcción
              </h1>
            </div>
            <p className="text-[11px] text-slate-400 pl-6 sm:pl-7">
              Gestión del personal de construcción
            </p>
          </div>

          {/* CARD 1: Registrar Nuevo Miembro - Compact Proportions */}
          <div className="bg-[#16171b] border border-[#262832] rounded-xl p-3 sm:p-3.5 shadow-md space-y-2.5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5 text-white" />
                <span>
                  {editingId ? 'Editar Miembro' : 'Registrar Nuevo Miembro'}
                </span>
              </h2>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="text-[11px] text-slate-400 hover:text-slate-200 underline"
                >
                  Cancelar
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-2.5">
              {/* Foto row */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full border border-dashed border-[#3a3e4c] bg-[#1a1b21] flex items-center justify-center overflow-hidden shrink-0">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-4 h-4 text-slate-400" />
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="staff-photo-upload"
                />
                <label
                  htmlFor="staff-photo-upload"
                  className="bg-[#1c1d24] hover:bg-[#252732] border border-[#2f3240] text-[11px] font-medium text-slate-200 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Upload className="w-3 h-3 text-slate-300" />
                  <span>Subir foto</span>
                </label>

                {photoPreview && (
                  <button
                    type="button"
                    onClick={() => setPhotoPreview(null)}
                    className="text-[10px] text-red-400 hover:text-red-300 ml-1"
                  >
                    Quitar
                  </button>
                )}
              </div>

              {/* Row 1: Nombre * & Cédula (opcional) */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-medium text-slate-300 block mb-0.5">
                    Nombre *
                  </label>
                  <input
                    id="staff-name-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre completo"
                    className="w-full bg-[#121316] border border-[#2b2e38] focus:border-red-400 focus:outline-none text-white text-xs rounded-lg px-2.5 py-1.5 placeholder-slate-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-300 block mb-0.5">
                    Cédula (opcional)
                  </label>
                  <input
                    type="text"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    placeholder="9-12 dígitos"
                    className="w-full bg-[#121316] border border-[#2b2e38] focus:border-red-400 focus:outline-none text-white text-xs rounded-lg px-2.5 py-1.5 placeholder-slate-500 transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Cargo * & Contacto */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-medium text-slate-300 block mb-0.5">
                    Cargo *
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Ej: Mantenimiento, Limpieza"
                    className="w-full bg-[#121316] border border-[#2b2e38] focus:border-red-400 focus:outline-none text-white text-xs rounded-lg px-2.5 py-1.5 placeholder-slate-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-300 block mb-0.5">
                    Contacto
                  </label>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Teléfono o email (opcional)"
                    className="w-full bg-[#121316] border border-[#2b2e38] focus:border-red-400 focus:outline-none text-white text-xs rounded-lg px-2.5 py-1.5 placeholder-slate-500 transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 px-3 rounded-lg font-medium text-xs text-white bg-[#d75a5a] hover:bg-[#c94d4d] active:scale-[0.99] transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>{editingId ? 'Actualizar Miembro' : 'Guardar Registro'}</span>
              </button>
            </form>
          </div>

          {/* CARD 2: Personal Registrado - Perfectly fitted to mobile screen */}
          <div className="bg-[#16171b] border border-[#262832] rounded-xl p-3 sm:p-3.5 shadow-md space-y-2.5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs sm:text-sm font-bold text-white">
                Personal Registrado
              </h2>
              <span className="text-[10px] text-slate-400 font-medium">
                {filteredStaff.length} de {staffList.length} miembros
              </span>
            </div>

            {/* Search input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre o cédula..."
                className="w-full bg-[#121316] border border-[#282a33] focus:border-red-400 focus:outline-none text-white text-xs rounded-lg pl-8 pr-3 py-1.5 placeholder-slate-500 transition-colors"
              />
            </div>

            {/* Table: Adjusted cleanly to fit screen width without oversized horizontal overflow */}
            <div className="overflow-x-auto -mx-1 sm:mx-0">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#252833] text-slate-400 text-[10px] sm:text-[11px] font-semibold">
                    <th className="py-1.5 px-1.5 w-8">Foto</th>
                    <th className="py-1.5 px-1.5">Nombre & Cargo</th>
                    <th className="py-1.5 px-1.5 w-24">Cédula</th>
                    <th className="py-1.5 px-1.5 w-20">Contacto</th>
                    <th className="py-1.5 px-1.5 text-right w-14">Acc.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f222b]">
                  {filteredStaff.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-5 text-slate-500 text-xs">
                        No se encontró personal registrado.
                      </td>
                    </tr>
                  ) : (
                    filteredStaff.map((member) => (
                      <tr
                        key={member.id}
                        className="hover:bg-[#1c1e24] transition-colors"
                      >
                        {/* Foto */}
                        <td className="py-2 px-1.5 align-middle">
                          <div className="w-7 h-7 rounded-full bg-[#20222a] border border-[#2c2f3b] flex items-center justify-center overflow-hidden shrink-0">
                            {member.photoUrl ? (
                              <img
                                src={member.photoUrl}
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User className="w-3.5 h-3.5 text-slate-400" />
                            )}
                          </div>
                        </td>

                        {/* Nombre & Cargo (stacked for perfect mobile screen fitting) */}
                        <td className="py-2 px-1.5 align-middle">
                          <span className="font-semibold text-white text-xs block leading-tight">
                            {member.name}
                          </span>
                          <span className="text-[10px] text-amber-400/90 font-medium block leading-tight mt-0.5">
                            {member.role}
                          </span>
                        </td>

                        {/* Cédula */}
                        <td className="py-2 px-1.5 text-[11px] text-slate-300 align-middle">
                          <span className="truncate block max-w-[90px]">
                            {member.cedula || '—'}
                          </span>
                        </td>

                        {/* Contacto */}
                        <td className="py-2 px-1.5 text-[11px] text-slate-300 align-middle">
                          <span className="truncate block max-w-[85px]" title={member.contact}>
                            {member.contact || '—'}
                          </span>
                        </td>

                        {/* Acciones */}
                        <td className="py-2 px-1.5 text-right align-middle">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleEdit(member)}
                              className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                              title="Editar"
                            >
                              <Pencil className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleDelete(member.id, member.name)}
                              className="p-1 text-[#ef4444] hover:text-[#f87171] transition-colors cursor-pointer"
                              title="Eliminar"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Total Footer count */}
            <div className="text-[10px] text-slate-500 pt-1 flex items-center justify-between border-t border-[#1e2029]">
              <span>Cima Real · Construcción</span>
              <span>Monitoreo Activo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
