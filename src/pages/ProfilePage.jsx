import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  MapPin,
  BadgeCheck,
  Briefcase,
  Zap,
  ArrowLeft,
  Calendar,
  Users,
  Award,
  ChevronRight,
} from 'lucide-react';
import { crewData } from '../data/crewData';
import BookingModal from '../components/BookingModal';
import Breadcrumb from '../components/Breadcrumb';
import LoadingSpinner from '../components/LoadingSpinner';

const roleColors = {
  Director: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Assistant Director': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  Cinematographer: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'Production Designer': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  'Sound Engineer': 'bg-green-500/20 text-green-300 border-green-500/30',
  'Costume Designer': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  Editor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  'Script Writer': 'bg-red-500/20 text-red-300 border-red-500/30',
  'VFX Artist': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
};

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crew, setCrew] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      const found = crewData.find((c) => c.id === parseInt(id));
      setCrew(found || null);
      setLoading(false);
    }, 500);
    return () => clearTimeout(t);
  }, [id]);

  if (loading) return <div className="min-h-screen bg-slate-950 pt-16"><LoadingSpinner message="Loading profile..." /></div>;

  if (!crew)
    return (
      <div className="min-h-screen bg-slate-950 pt-16 flex flex-col items-center justify-center gap-4">
        <p className="text-slate-400 text-lg">Profile not found.</p>
        <button onClick={() => navigate('/browse')} className="text-blue-400 hover:text-blue-300 transition-colors">
          ← Back to Browse
        </button>
      </div>
    );

  const roleColor = roleColors[crew.role] || 'bg-slate-500/20 text-slate-300 border-slate-500/30';

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-16">
      {/* Breadcrumb & Back */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <Breadcrumb
            items={[
              { label: 'Browse Crew', to: '/browse' },
              { label: crew.name },
            ]}
          />
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Profile header */}
        <div className="glass-card rounded-3xl overflow-hidden mb-6 animate-fade-in">
          {/* Banner */}
          <div className="h-40 bg-gradient-to-r from-blue-900 via-indigo-900 to-violet-900 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.3),transparent_70%)]" />
          </div>

          <div className="px-6 sm:px-8 pb-8">

            {/* ── Avatar row — only image gets the -mt-16 pull-up ── */}
            <div className="-mt-16 mb-4 flex items-end gap-4">
              <div className="relative flex-shrink-0">
                <img
                  src={crew.image}
                  alt={crew.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-slate-900 bg-slate-800 shadow-2xl"
                />
                {crew.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-1.5 shadow-lg">
                    <BadgeCheck className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* ── Name + Book Now — fully below the banner ── */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <span
                  className={`inline-block text-xs px-3 py-1 rounded-full border font-medium mb-2 ${roleColor}`}
                >
                  {crew.role}
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-white">{crew.name}</h1>
              </div>

              {/* Book Now CTA */}
              <button
                id={`book-now-${crew.id}`}
                onClick={() => setShowModal(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-blue-600/30 hover:shadow-blue-500/40 hover:scale-105 flex-shrink-0"
              >
                <Calendar className="w-5 h-5" />
                Book Now
              </button>
            </div>

            {/* Meta info row */}
            <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-6">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-500" />
                {crew.location}
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-slate-500" />
                {crew.experience} years experience
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-slate-500" />
                {crew.totalBookings} bookings
              </div>
              <div
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${
                  crew.available
                    ? 'bg-green-500/10 text-green-300 border-green-500/20'
                    : 'bg-red-500/10 text-red-300 border-red-500/20'
                }`}
              >
                <Zap className="w-3 h-3" />
                {crew.available ? 'Available for Projects' : 'Currently Busy'}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">{renderStars(crew.rating)}</div>
              <span className="text-white font-bold text-lg">{crew.rating}</span>
              <span className="text-slate-400 text-sm">/ 5.0</span>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-base leading-relaxed">{crew.description}</p>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Skills + Projects */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills */}
            <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-400" />
                Skills & Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {crew.skills.map((s) => (
                  <span
                    key={s}
                    className="bg-blue-500/10 text-blue-300 border border-blue-500/20 text-sm px-3 py-1.5 rounded-full font-medium hover:bg-blue-500/20 transition-colors"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Notable Projects */}
            <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.15s' }}>
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-400" />
                Notable Projects
              </h2>
              <div className="space-y-3">
                {crew.projects.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl">
                    <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400 text-xs font-bold">{i + 1}</span>
                    </div>
                    <span className="text-slate-300 text-sm font-medium">{p}</span>
                    <ChevronRight className="w-4 h-4 text-slate-600 ml-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            {/* Rate card */}
            <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-base font-bold text-white mb-4">Pricing</h2>
              <div className="text-center py-4">
                <div className="text-4xl font-black text-blue-400 mb-1">
                  ₹{crew.hourlyRate?.toLocaleString()}
                </div>
                <div className="text-slate-500 text-sm">per day</div>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20 hover:scale-105 mt-2"
              >
                Book This Professional
              </button>
            </div>

            {/* Stats */}
            <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.25s' }}>
              <h2 className="text-base font-bold text-white mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Experience</span>
                  <span className="text-white font-semibold text-sm">{crew.experience} years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Total Bookings</span>
                  <span className="text-white font-semibold text-sm">{crew.totalBookings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-semibold text-sm">{crew.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Verified</span>
                  <span className={`text-sm font-semibold ${crew.verified ? 'text-blue-400' : 'text-slate-500'}`}>
                    {crew.verified ? '✓ Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            {/* Similar roles */}
            <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-base font-bold text-white mb-4">Similar Roles</h2>
              <div className="space-y-2">
                {crewData
                  .filter((c) => c.role === crew.role && c.id !== crew.id)
                  .slice(0, 3)
                  .map((c) => (
                    <Link
                      key={c.id}
                      to={`/profile/${c.id}`}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800 transition-colors"
                    >
                      <img src={c.image} alt={c.name} className="w-9 h-9 rounded-full object-cover bg-slate-700" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{c.name}</p>
                        <p className="text-slate-500 text-xs">{c.location}</p>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-slate-400 text-xs">{c.rating}</span>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && <BookingModal crew={crew} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ProfilePage;
