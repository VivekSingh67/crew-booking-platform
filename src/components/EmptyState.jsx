import { SearchX } from 'lucide-react';

const EmptyState = ({ message = 'No results found', subtitle = 'Try adjusting your filters' }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
    <div className="p-5 bg-slate-800 rounded-2xl">
      <SearchX className="w-12 h-12 text-slate-500" />
    </div>
    <div>
      <h3 className="text-white font-bold text-lg mb-1">{message}</h3>
      <p className="text-slate-400 text-sm">{subtitle}</p>
    </div>
  </div>
);

export default EmptyState;
