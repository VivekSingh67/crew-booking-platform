import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search } from 'lucide-react';
import { crewData } from '../data/crewData';
import CrewCard from '../components/CrewCard';
import FilterPanel from '../components/FilterPanel';
import Breadcrumb from '../components/Breadcrumb';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

const DEFAULT_FILTERS = {
  role: 'All Roles',
  location: '',
  minRating: 1,
  maxRating: 5,
  availability: 'All',
  verifiedOnly: false,
};

const BrowsePage = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    role: searchParams.get('role') || 'All Roles',
  });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    return crewData.filter((c) => {
      if (filters.role !== 'All Roles' && c.role !== filters.role) return false;
      if (filters.location && !c.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (c.rating < filters.minRating || c.rating > filters.maxRating) return false;
      if (filters.availability === 'Available' && !c.available) return false;
      if (filters.availability === 'Busy' && c.available) return false;
      if (filters.verifiedOnly && !c.verified) return false;
      if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.role.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [filters, search]);

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setSearch('');
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-16">
      {/* Page header */}
      <div className="bg-slate-900/50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb items={[{ label: 'Browse Crew' }]} />
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-white">Browse Crew</h1>
              <p className="text-slate-400 text-sm mt-1">
                {loading ? '...' : `${filtered.length} professionals found`}
              </p>
            </div>
            {/* Search bar */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search by name or role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile filter button */}
        <button
          onClick={() => setFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 mb-6 px-4 py-2.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-xl text-sm font-medium hover:border-blue-500/50 hover:text-white transition-all"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {Object.entries(filters).some(([k, v]) => v !== DEFAULT_FILTERS[k]) && (
            <span className="bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">!</span>
          )}
        </button>

        <div className="flex gap-8">
          {/* Filter sidebar */}
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            onReset={resetFilters}
            isOpen={filterOpen}
            onClose={() => setFilterOpen(false)}
          />

          {/* Main grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <LoadingSpinner message="Finding professionals..." />
            ) : filtered.length === 0 ? (
              <EmptyState
                message="No crew members found"
                subtitle="Try adjusting your filters or search query"
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((crew, i) => (
                  <div
                    key={crew.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <CrewCard crew={crew} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;
