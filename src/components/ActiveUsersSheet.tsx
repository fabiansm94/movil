import React, { useState } from 'react';
import { Users, Radio, Shield, Check, MessageSquare, Building2, X } from 'lucide-react';
import { GuardUser } from '../types';

interface Props {
  users: GuardUser[];
  onAssignCondo?: (userId: string, condo: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
  embedded?: boolean;
  isFramed?: boolean;
}

export const ActiveUsersSheet: React.FC<Props> = ({
  users,
  onAssignCondo,
  isOpen = false,
  onClose,
  embedded = false,
  isFramed = false
}) => {
  const [selectedUser, setSelectedUser] = useState<GuardUser | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const condoOptions = [
    'Sin condominio',
    'Condominio Foresta',
    'Condominio Sunset Hills',
    'Hotel Pumilio',
    'Condominio Cima Real'
  ];

  const handleCondoChange = (userId: string, condo: string) => {
    if (onAssignCondo) {
      onAssignCondo(userId, condo);
    }
    setToastMessage(`Asignado a ${condo}`);
    setTimeout(() => setToastMessage(null), 2000);
    setSelectedUser(null);
  };

  const content = (
    <div className="bg-[#18191d] rounded-2xl border border-[#272a32] p-4 shadow-md space-y-3">
      {/* Header matching screenshot */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-950/70 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white tracking-tight">
              Usuarios con sesión abierta
            </h3>
            <span className="text-[10px] text-slate-400">Personal STS en turno</span>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-700/60 shadow-sm flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {users.filter((u) => u.online).length} activos
        </span>
      </div>

      {toastMessage && (
        <div className="text-[11px] bg-emerald-950 text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-800 flex items-center gap-1.5 animate-in fade-in">
          <Check className="w-3.5 h-3.5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Users list matching screenshot */}
      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedUser(user)}
            className="p-2.5 rounded-xl bg-[#131418] border border-[#252830] hover:border-[#3b3f4c] flex items-center justify-between cursor-pointer transition-all active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              {/* User Avatar with initial */}
              <div className="relative">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold ring-1 ring-white/10 ${user.avatarColor}`}
                >
                  {user.initial}
                </div>
                {user.online && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#131418]" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-100">{user.name}</span>
                  {user.name === 'Fabian' && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-red-950 text-red-300 font-semibold border border-red-800/40">
                      Tú
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 block">{user.condo}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-mono block">
                Turno: {user.shiftStart}
              </span>
              <span className="text-[10px] text-emerald-400 font-medium">Activo</span>
            </div>
          </div>
        ))}
      </div>

      {/* User Assigning Dialog */}
      {selectedUser && (
        <div className="p-3 rounded-xl bg-[#1f2129] border border-[#353947] space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white">
              Asignar Garita / Condominio a {selectedUser.name}
            </span>
            <button
              onClick={() => setSelectedUser(null)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-1 pt-1">
            {condoOptions.map((c) => (
              <button
                key={c}
                onClick={() => handleCondoChange(selectedUser.id, c)}
                className={`text-left text-xs px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                  selectedUser.condo === c
                    ? 'bg-red-600 text-white font-semibold'
                    : 'bg-[#15161b] text-slate-300 hover:bg-[#252834]'
                }`}
              >
                <span>{c}</span>
                {selectedUser.condo === c && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (embedded) return content;

  return (
    <div
      onClick={onClose}
      className={`${isFramed ? 'absolute' : 'fixed'} inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm p-0 animate-in fade-in`}
    >
      <div
        className="w-full bg-[#18191d] border-t border-[#2f323c] rounded-t-3xl max-h-[90%] overflow-y-auto shadow-2xl p-4 animate-in slide-in-from-bottom-4 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 bg-slate-600/50 rounded-full mx-auto mb-3 shrink-0" />
        <div className="flex justify-between items-center pb-2 mb-2 border-b border-[#272a33]">
          <h3 className="text-sm font-bold text-white">Usuarios Activos</h3>
          {onClose && (
            <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {content}
      </div>
    </div>
  );
};
