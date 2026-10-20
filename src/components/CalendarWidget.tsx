import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Bell, Shield } from 'lucide-react';

interface Props {
  onSelectDate?: (day: number) => void;
}

export const CalendarWidget: React.FC<Props> = ({ onSelectDate }) => {
  const [selectedDay, setSelectedDay] = useState<number>(19); // 19 is active today in screenshot

  const daysHeader = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  // October 2026 starts on Thursday (index 3 if Monday is index 0)
  // Mon=0, Tue=1, Wed=2, Thu=3, Fri=4, Sat=5, Sun=6
  // In October 2026: Oct 1 is Thursday. So 3 empty slots before day 1.
  const emptyLeadingDays = 3;
  const totalDays = 31;

  const daysWithNotes: Record<number, { title: string; count: number }> = {
    20: { title: 'Mantenimiento Xeoma y Portón Foresta', count: 2 },
    29: { title: 'Inspección Perimetral STS Cima Real', count: 1 }
  };

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    if (onSelectDate) onSelectDate(day);
  };

  return (
    <div className="bg-[#18191d] rounded-2xl border border-[#272a32] p-4 shadow-md space-y-3">
      {/* Month Header matching screenshot */}
      <div className="flex items-center justify-between">
        <button
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#23262f] transition-colors"
          title="Mes anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="text-center">
          <span className="text-xs font-bold text-white tracking-wide">
            Octubre 2026
          </span>
        </div>

        <button
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#23262f] transition-colors"
          title="Mes siguiente"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Weekday abbreviations */}
      <div className="grid grid-cols-7 text-center gap-1">
        {daysHeader.map((d, i) => (
          <span key={i} className="text-[10px] font-semibold text-slate-400 py-0.5">
            {d}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 text-center gap-1 text-xs">
        {/* Leading empty slots */}
        {Array.from({ length: emptyLeadingDays }).map((_, i) => (
          <div key={`empty-${i}`} className="h-7 w-7 mx-auto" />
        ))}

        {/* October Days 1 to 31 */}
        {Array.from({ length: totalDays }).map((_, i) => {
          const day = i + 1;
          const isSelected = selectedDay === day;
          const hasNote = daysWithNotes[day];

          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              className={`h-7 w-7 mx-auto rounded-lg flex flex-col items-center justify-center font-medium transition-all relative ${
                isSelected
                  ? 'bg-[#e14c4c] text-white font-bold shadow-md shadow-red-950/60 scale-105'
                  : 'text-slate-300 hover:bg-[#22242c]'
              }`}
            >
              <span>{day}</span>
              {/* Event indicator badge matching screenshot on day 20 and 29 */}
              {hasNote && !isSelected && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 ring-1 ring-[#18191d]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Day Agenda Hint */}
      <div className="pt-2 border-t border-[#23262e] text-[11px] text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1 text-slate-300">
          <CalendarIcon className="w-3.5 h-3.5 text-red-400" />
          {selectedDay} de Octubre, 2026
        </span>
        {daysWithNotes[selectedDay] ? (
          <span className="text-amber-400 font-medium">
            {daysWithNotes[selectedDay].count} evento(s)
          </span>
        ) : (
          <span className="text-slate-500">Sin novedades</span>
        )}
      </div>
    </div>
  );
};
