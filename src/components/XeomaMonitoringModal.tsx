import React, { useState, useEffect } from 'react';
import {
  X,
  Camera,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  RefreshCw,
  Sliders,
  AlertTriangle,
  Radio,
  Eye,
  ChevronLeft,
  ChevronRight,
  MoveUp,
  MoveDown,
  Volume2,
  VolumeX,
  HardDrive
} from 'lucide-react';
import { XEOMA_CAMERAS } from '../data/mockData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isFramed?: boolean;
}

export const XeomaMonitoringModal: React.FC<Props> = ({ isOpen, onClose, isFramed = false }) => {
  const [selectedCam, setSelectedCam] = useState<string>(XEOMA_CAMERAS[0].id);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [ptzMessage, setPtzMessage] = useState<string | null>(null);
  const [audioMuted, setAudioMuted] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('es-CR') + ' ' + now.toLocaleTimeString('es-CR')
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const currentCamera = XEOMA_CAMERAS.find((c) => c.id === selectedCam) || XEOMA_CAMERAS[0];

  const handlePtz = (direction: string) => {
    setPtzMessage(`PTZ: Movimiento hacia ${direction}`);
    setTimeout(() => setPtzMessage(null), 1500);
  };

  return (
    <div
      onClick={onClose}
      className="absolute inset-0 z-50 flex items-end justify-center bg-black/85 backdrop-blur-md p-0 animate-in fade-in overflow-hidden"
    >
      <div
        className="w-full bg-[#14151a] border-t border-[#2a2d37] rounded-t-3xl h-[94%] max-h-[94%] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS / Android Handle */}
        <div className="w-12 h-1.5 bg-slate-600/50 rounded-full mx-auto mt-2.5 mb-1 shrink-0" />

        {/* Header */}
        <div className="px-4 py-2.5 border-b border-[#242731] flex items-center justify-between bg-[#14151a] shrink-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white tracking-tight">
                  Control remoto Xeoma
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-bold border border-emerald-800">
                  ONLINE
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Servidor Central STS · Puerto 8090
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1e2028] border border-[#2d303b] flex items-center justify-center text-slate-300 hover:text-white cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Camera Selector Tabs */}
        <div className="px-3 pt-2.5 pb-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 touch-pan-x">
          {XEOMA_CAMERAS.map((cam) => (
            <button
              key={cam.id}
              onClick={() => setSelectedCam(cam.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                selectedCam === cam.id
                  ? 'bg-[#e14c4c] text-white shadow-sm'
                  : 'bg-[#1b1d24] text-slate-400 hover:text-slate-200 border border-[#282b35]'
              }`}
            >
              <Radio className="w-3 h-3" />
              <span>{cam.name.split(' - ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Video Viewport / Feed Simulator - Scrollable Area */}
        <div className="p-3.5 space-y-3 flex-1 overflow-y-auto overscroll-contain touch-pan-y scrollbar-thin">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-[#2a2d37] shadow-inner flex flex-col justify-between p-3">
            {/* Background simulated CCTV static / visual */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-neutral-950 to-black opacity-90" />
            
            {/* Grid overlay lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Live Camera Info Overlay Top */}
            <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-white/90 drop-shadow">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md border border-white/10">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-bold text-red-400">REC</span>
                <span>{currentCamera.name}</span>
              </div>

              <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md border border-white/10">
                <span>{currentTime || '2026-10-19 08:02:30'}</span>
              </div>
            </div>

            {/* Target Recognition Center Overlay */}
            <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center space-y-1">
              <div className="w-24 h-16 border border-emerald-400/60 rounded-md relative flex items-center justify-center bg-emerald-500/5">
                <span className="absolute -top-3 left-1 text-[9px] font-mono bg-emerald-950 text-emerald-300 px-1 rounded border border-emerald-800">
                  {currentCamera.type}
                </span>
                <Eye className="w-5 h-5 text-emerald-400/80 animate-pulse" />
              </div>
              <span className="text-[10px] text-slate-300 font-mono bg-black/50 px-2 py-0.5 rounded">
                {currentCamera.condo} · {currentCamera.location}
              </span>
            </div>

            {/* Bottom Camera Stats Overlay */}
            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-slate-300">
              <div className="flex items-center gap-2 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                <span>FPS: {currentCamera.fps}</span>
                <span>·</span>
                <span>RES: {currentCamera.res}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setAudioMuted(!audioMuted)}
                  className="p-1 rounded bg-black/60 hover:bg-black/90 text-white"
                  title="Audio"
                >
                  {audioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1 rounded bg-black/60 hover:bg-black/90 text-white"
                  title="Pausar / Reproducir"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* PTZ and Controls Feedback */}
          {ptzMessage && (
            <div className="text-[11px] text-center font-mono text-cyan-300 bg-cyan-950/60 py-1 rounded border border-cyan-800 animate-pulse">
              {ptzMessage}
            </div>
          )}

          {/* Mobile PTZ Controller Bar */}
          <div className="bg-[#181920] p-3 rounded-xl border border-[#272a33] flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-white block">Controles PTZ Garita</span>
              <span className="text-[10px] text-slate-400">Zoom y orientación óptica</span>
            </div>

            {/* D-Pad Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePtz('Izquierda')}
                className="w-8 h-8 rounded-lg bg-[#22252e] hover:bg-[#2c303c] flex items-center justify-center text-slate-200 active:scale-95 border border-[#313543]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => handlePtz('Arriba')}
                  className="w-8 h-8 rounded-lg bg-[#22252e] hover:bg-[#2c303c] flex items-center justify-center text-slate-200 active:scale-95 border border-[#313543]"
                >
                  <MoveUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handlePtz('Abajo')}
                  className="w-8 h-8 rounded-lg bg-[#22252e] hover:bg-[#2c303c] flex items-center justify-center text-slate-200 active:scale-95 border border-[#313543]"
                >
                  <MoveDown className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => handlePtz('Derecha')}
                className="w-8 h-8 rounded-lg bg-[#22252e] hover:bg-[#2c303c] flex items-center justify-center text-slate-200 active:scale-95 border border-[#313543]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                setPtzMessage('📸 Fotograma capturado y guardado en bitácora STS');
                setTimeout(() => setPtzMessage(null), 2000);
              }}
              className="py-2.5 px-3 rounded-xl bg-[#22252e] hover:bg-[#2d313d] text-slate-200 font-semibold border border-[#333744] flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Camera className="w-4 h-4 text-cyan-400" />
              <span>Capturar Foto Placa</span>
            </button>

            <button
              onClick={() => {
                setPtzMessage('🚨 Alarma preventiva disparada en garita');
                setTimeout(() => setPtzMessage(null), 2500);
              }}
              className="py-2.5 px-3 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-200 font-semibold border border-red-800/60 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>Alerta Sonora</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
