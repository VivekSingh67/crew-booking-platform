import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Trash2,
  Users,
  TrendingUp,
  ExternalLink,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import EmptyState from '../components/EmptyState';

const statusConfig = {
  Confirmed: {
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    icon: CheckCircle2,
  },
  Pending: {
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    icon: Clock,
  },
  Cancelled: {
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    icon: XCircle,
  },
};

const DashboardPage = () => {
  const { bookings, cancelBooking } = useBooking();
  const [activeTab, setActiveTab] = useState('All');
  const [cancelConfirm, setCancelConfirm] = useState(null);

  const tabs = ['All', 'Confirmed', 'Pending', 'Cancelled'];

  const filtered =
    activeTab === 'All' ? bookings : bookings.filter((b) => b.status === activeTab);

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === 'Confirmed').length,
    pending: bookings.filter((b) => b.status === 'Pending').length,
    cancelled: bookings.filter((b) => b.status === 'Cancelled').length,
  };

  const handleCancel = (id) => {
    cancelBooking(id);
    setCancelConfirm(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-16">

      {/* ── Page Header ── */}
      <div className="bg-slate-900/50 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-blue-600 rounded-xl flex-shrink-0">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">My Dashboard</h1>
          </div>
          <p className="text-slate-400 text-sm pl-0 sm:pl-12">
            Manage your crew bookings and history.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* ── Stats Grid — 2 cols on mobile, 4 on lg ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[
            { label: 'Total Bookings', value: stats.total,     icon: Calendar,     color: 'text-blue-400',   bg: 'bg-blue-500/10'  },
            { label: 'Confirmed',      value: stats.confirmed, icon: CheckCircle2, color: 'text-green-400',  bg: 'bg-green-500/10' },
            { label: 'Pending',        value: stats.pending,   icon: Clock,        color: 'text-yellow-400', bg: 'bg-yellow-500/10'},
            { label: 'Cancelled',      value: stats.cancelled, icon: XCircle,      color: 'text-red-400',    bg: 'bg-red-500/10'   },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="glass-card rounded-2xl p-4 sm:p-5 animate-fade-in">
              <div className={`inline-flex p-2 sm:p-2.5 rounded-xl ${bg} mb-2 sm:mb-3`}>
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${color}`} />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mb-0.5 sm:mb-1">
                {value}
              </div>
              <div className="text-slate-400 text-xs sm:text-sm leading-tight">{label}</div>
            </div>
          ))}
        </div>

        {/* ── Tabs — scrollable on mobile ── */}
        <div className="mb-5 sm:mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto">
          <div className="flex gap-1 p-1 bg-slate-800/50 rounded-xl w-max sm:w-fit min-w-full sm:min-w-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab}
                {tab !== 'All' && (
                  <span className="ml-1 text-xs opacity-70">
                    ({bookings.filter((b) => b.status === tab).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Booking Cards ── */}
        {filtered.length === 0 ? (
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <EmptyState
              message={`No ${activeTab === 'All' ? '' : activeTab.toLowerCase()} bookings yet`}
              subtitle="Browse crew members and make your first booking"
            />
            <div className="flex justify-center mt-4">
              <Link
                to="/browse"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg text-sm"
              >
                <Users className="w-4 h-4" />
                Browse Crew
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((booking, i) => {
              const sc = statusConfig[booking.status] || statusConfig.Pending;
              const StatusIcon = sc.icon;
              return (
                <div
                  key={booking.id}
                  className="glass-card rounded-2xl p-4 sm:p-5 hover:border-slate-600/50 transition-all duration-200 animate-fade-in"
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  {/* ── Top row: avatar + name + status + actions ── */}
                  <div className="flex items-start gap-3 sm:gap-4">

                    {/* Avatar */}
                    <img
                      src={booking.crewImage}
                      alt={booking.crewName}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover bg-slate-800 flex-shrink-0"
                    />

                    {/* Name / Role / Description */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <h3 className="text-white font-bold text-sm sm:text-base leading-tight">
                          {booking.crewName}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium border ${sc.bg} ${sc.color} ${sc.border}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs sm:text-sm">{booking.crewRole}</p>
                      <p className="text-slate-500 text-xs mt-1 line-clamp-2 sm:line-clamp-1">
                        {booking.description}
                      </p>
                    </div>

                    {/* Action buttons — top right */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Link
                        to={`/profile/${booking.crewId}`}
                        className="p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-colors"
                        title="View Profile"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      {booking.status !== 'Cancelled' && (
                        <button
                          onClick={() => setCancelConfirm(booking.id)}
                          className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Cancel Booking"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* ── Bottom row: meta chips ── */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3 pt-3 border-t border-slate-700/50">
                    {/* Booking Date */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-lg">
                      <Calendar className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                      <span className="font-medium text-white">{booking.bookingDate}</span>
                    </div>

                    {/* Booking ID */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-lg">
                      <span className="text-slate-500">ID:</span>
                      <span className="font-mono font-bold text-blue-400">{booking.id}</span>
                    </div>

                    {/* Created At */}
                    {booking.createdAt && (
                      <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-800/40 px-3 py-1.5 rounded-lg">
                        <span>Booked on</span>
                        <span className="text-slate-400">{booking.createdAt}</span>
                      </div>
                    )}

                    {/* View profile — text link on mobile */}
                    <Link
                      to={`/profile/${booking.crewId}`}
                      className="ml-auto flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium"
                    >
                      View Profile <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Tip Banner ── */}
        {bookings.length > 0 && (
          <div className="mt-6 sm:mt-8 p-4 sm:p-5 glass-card rounded-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2.5 sm:p-3 bg-blue-500/10 rounded-xl flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Keep growing your team</p>
                  <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                    Browse more professionals and build the perfect crew for your next project.
                  </p>
                </div>
              </div>
              <Link
                to="/browse"
                className="flex items-center justify-center gap-1.5 sm:justify-start text-sm font-semibold px-4 py-2.5 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 hover:text-blue-300 transition-all border border-blue-500/20 flex-shrink-0"
              >
                Browse Crew <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ── Cancel Confirm Dialog ── */}
      {cancelConfirm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setCancelConfirm(null)}
          />
          {/* Sheet on mobile, modal on sm+ */}
          <div className="relative z-10 glass-card rounded-t-3xl sm:rounded-2xl p-6 w-full sm:max-w-sm animate-fade-in">
            {/* Handle bar for mobile sheet */}
            <div className="w-10 h-1 bg-slate-600 rounded-full mx-auto mb-5 sm:hidden" />
            <h3 className="text-white font-bold text-xl mb-2">Cancel Booking?</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              This action cannot be undone. The booking will be permanently marked as cancelled.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setCancelConfirm(null)}
                className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 text-sm font-medium transition-all"
              >
                Keep Booking
              </button>
              <button
                onClick={() => handleCancel(cancelConfirm)}
                className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-all shadow-lg shadow-red-600/20"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
