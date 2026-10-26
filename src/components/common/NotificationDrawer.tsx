import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CheckCheck, Clock, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationDrawer: React.FC = () => {
  const {
    isNotificationsOpen,
    setIsNotificationsOpen,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    unreadNotificationCount
  } = useApp();
  const navigate = useNavigate();

  if (!isNotificationsOpen) return null;

  const handleNotificationClick = (id: string, link: string) => {
    markNotificationAsRead(id);
    setIsNotificationsOpen(false);
    navigate(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface border-l border-surface-border shadow-cinematic flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-surface-border flex items-center justify-between bg-surface-elevated">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Underwriting Notifications</h3>
              {unreadNotificationCount > 0 && (
                <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-brand-teal text-background font-bold">
                  {unreadNotificationCount} new
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unreadNotificationCount > 0 && (
                <button
                  onClick={markAllNotificationsAsRead}
                  className="p-1.5 rounded-md hover:bg-surface-higher text-petText-muted hover:text-white text-xs flex items-center gap-1 transition-colors"
                  title="Mark all as read"
                >
                  <CheckCheck size={14} />
                  <span className="hidden sm:inline">Mark read</span>
                </button>
              )}
              <button
                onClick={() => setIsNotificationsOpen(false)}
                className="p-1.5 rounded-md hover:bg-surface-higher text-petText-muted hover:text-white transition-colors"
                aria-label="Close notifications drawer"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto divide-y divide-surface-border p-3 space-y-2">
            {notifications.map(item => {
              const priorityDot = {
                high: 'bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.5)]',
                medium: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]',
                low: 'bg-brand-teal shadow-[0_0_8px_rgba(20,184,166,0.5)]'
              }[item.priority];

              return (
                <div
                  key={item.id}
                  onClick={() => handleNotificationClick(item.id, item.link)}
                  className={`p-3.5 rounded-xl transition-all cursor-pointer group ${
                    item.read
                      ? 'bg-transparent hover:bg-surface-elevated/60 opacity-75'
                      : 'bg-surface-elevated hover:bg-surface-higher border border-surface-border/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${priorityDot}`} />
                      <h4 className="text-xs font-semibold text-white group-hover:text-brand-ivory transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-petText-dim shrink-0 flex items-center gap-1">
                      <Clock size={10} />
                      {item.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-petText-secondary leading-relaxed pl-4">
                    {item.description}
                  </p>

                  <div className="mt-2.5 pl-4 flex items-center gap-1 text-[11px] font-mono text-brand-teal group-hover:text-teal-300">
                    <span>Inspect Record</span>
                    <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-surface-border bg-surface-elevated/60 text-center">
            <p className="text-[11px] text-petText-dim font-mono">
              Real-time webhook notifications enabled via Cessna Lifeline &amp; Crown Vet API
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
