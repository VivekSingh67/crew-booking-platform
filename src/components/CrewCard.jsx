import { Link } from 'react-router-dom';
import { Star, MapPin, BadgeCheck, Zap } from 'lucide-react';

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

const CrewCard = ({ crew }) => {
  const roleColor = roleColors[crew.role] || 'bg-slate-500/20 text-slate-300 border-slate-500/30';

  return (
    <Link to={`/profile/${crew.id}`} className="block group">
      <div className="glass-card rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
        {/* Image section */}
        <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-700 overflow-hidden">
          <img
            src={crew.image}
            alt={crew.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {crew.verified && (
              <span className="flex items-center gap-1 bg-blue-600/90 text-white text-xs px-2 py-1 rounded-full font-medium backdrop-blur-sm">
                <BadgeCheck className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>
          <div className="absolute top-3 right-3">
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium border flex items-center gap-1 backdrop-blur-sm ${
                crew.available
                  ? 'bg-green-500/20 text-green-300 border-green-500/30'
                  : 'bg-red-500/20 text-red-300 border-red-500/30'
              }`}
            >
              <Zap className="w-3 h-3" />
              {crew.available ? 'Available' : 'Busy'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
            {crew.name}
          </h3>

          <span className={`inline-block text-xs px-3 py-1 rounded-full border font-medium mb-3 ${roleColor}`}>
            {crew.role}
          </span>

          <div className="flex items-center justify-between mb-3">
            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-semibold text-sm">{crew.rating}</span>
              <span className="text-slate-400 text-xs">/ 5.0</span>
            </div>
            {/* Experience */}
            <span className="text-slate-400 text-xs">{crew.experience} yrs exp.</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400 text-sm">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{crew.location}</span>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-between">
            <div>
              <span className="text-blue-400 font-bold text-sm">₹{crew.hourlyRate?.toLocaleString()}</span>
              <span className="text-slate-500 text-xs"> /day</span>
            </div>
            <span className="text-xs text-slate-500">{crew.totalBookings} bookings</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CrewCard;
