const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-4">
    <div className="relative">
      <div className="w-14 h-14 rounded-full border-4 border-slate-700"></div>
      <div className="absolute inset-0 w-14 h-14 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
    </div>
    <p className="text-slate-400 text-sm font-medium">{message}</p>
  </div>
);

export default LoadingSpinner;
