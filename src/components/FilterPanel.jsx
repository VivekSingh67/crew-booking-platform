import { Star, SlidersHorizontal, RotateCcw, X } from 'lucide-react';
import { roles } from '../data/crewData';

const FilterPanel = ({ filters, setFilters, onReset, isOpen, onClose }) => {
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const panelContent = (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-blue-400" />
          <h3 className="text-white font-bold text-base">Filters</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-400 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
          {/* Only show close on mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Role */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
        <select
          value={filters.role}
          onChange={(e) => handleChange('role', e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          {roles.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
        <input
          type="text"
          placeholder="e.g. Mumbai"
          value={filters.location}
          onChange={(e) => handleChange('location', e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Min Rating */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-slate-300">Min Rating</label>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="text-yellow-400 font-bold text-sm">{filters.minRating}</span>
          </div>
        </div>
        <input
          type="range"
          min="1"
          max="5"
          step="0.1"
          value={filters.minRating}
          onChange={(e) => handleChange('minRating', parseFloat(e.target.value))}
          className="w-full accent-blue-500 cursor-pointer"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>1.0</span>
          <span>5.0</span>
        </div>
      </div>

      {/* Max Rating */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-slate-300">Max Rating</label>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="text-yellow-400 font-bold text-sm">{filters.maxRating}</span>
          </div>
        </div>
        <input
          type="range"
          min="1"
          max="5"
          step="0.1"
          value={filters.maxRating}
          onChange={(e) => handleChange('maxRating', parseFloat(e.target.value))}
          className="w-full accent-blue-500 cursor-pointer"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>1.0</span>
          <span>5.0</span>
        </div>
      </div>

      {/* Availability */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Availability</label>
        <div className="space-y-2">
          {['All', 'Available', 'Busy'].map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="availability"
                value={opt}
                checked={filters.availability === opt}
                onChange={(e) => handleChange('availability', e.target.value)}
                className="accent-blue-500 w-4 h-4"
              />
              <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Verified */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(e) => handleChange('verifiedOnly', e.target.checked)}
            className="accent-blue-500 w-4 h-4 rounded"
          />
          <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
            Verified Only
          </span>
        </label>
      </div>

      {/* Reset button */}
      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white text-sm font-medium rounded-xl transition-all duration-200"
      >
        <RotateCcw className="w-4 h-4" />
        Reset All Filters
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="glass-card rounded-2xl p-5 sticky top-20">
          {panelContent}
        </div>
      </aside>

      {/* Mobile drawer overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="relative z-10 w-72 max-w-full bg-slate-900 border-r border-slate-700 p-5 overflow-y-auto animate-slide-in">
            {panelContent}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanel;
