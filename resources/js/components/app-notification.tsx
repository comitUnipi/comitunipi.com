import { formatDate } from '@/lib/format-date';
import type { Kegiatan } from '@/types';
import { Bell, CalendarDays, MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function NotificationButton() {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState<Kegiatan[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/kegiatan/notification')
      .then((res) => res.json())
      .then((data: Kegiatan[]) => setEvents(data))
      .catch((err) => console.error('Gagal mengambil data kegiatan:', err));
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const count = events.length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setOpen(!open)} className="hover:bg-accent relative rounded-md p-2 transition duration-200">
        <Bell className="text-muted-foreground h-5 w-5" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white shadow-md ring-2 ring-white">
            {count}
          </span>
        )}
      </button>

      {open && (
        <div className="animate-in fade-in slide-in-from-top-2 absolute -right-10 z-50 mt-2 w-[300px] rounded-md border bg-white shadow-xl transition-all">
          <div className="p-4">
            <h4 className="mb-3 text-sm font-semibold text-gray-700">📅 Kegiatan Mendatang</h4>

            {count > 0 ? (
              <ul className="max-h-64 space-y-3 overflow-y-auto pr-1">
                {events.map((event) => (
                  <li key={event.id} className="rounded-md border border-gray-100 p-3 text-sm transition hover:bg-gray-50">
                    <div className="font-medium text-gray-800">{event.name}</div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                      <CalendarDays className="h-4 w-4" />
                      {formatDate(event.date)} — {event.time}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center text-sm text-gray-500">
                <span className="mb-2 text-2xl">🎉</span>
                Tidak ada kegiatan mendatang
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
