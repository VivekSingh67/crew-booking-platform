import { useState } from 'react';
import { X, User, Phone, FileText, Calendar, Loader2 } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import toast from 'react-hot-toast';

const BookingModal = ({ crew, onClose }) => {
  const { addBooking } = useBooking();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    userName: '',
    contact: '',
    description: '',
    bookingDate: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.userName.trim()) errs.userName = 'Name is required';
    if (!form.contact.trim()) errs.contact = 'Contact is required';
    else if (!/^\d{10}$/.test(form.contact)) errs.contact = 'Enter valid 10-digit number';
    if (!form.description.trim()) errs.description = 'Description is required';
    if (!form.bookingDate) errs.bookingDate = 'Booking date is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      addBooking({
        crewId: crew.id,
        crewName: crew.name,
        crewRole: crew.role,
        crewImage: crew.image,
        ...form,
      });
      setLoading(false);
      toast.success(`Booking confirmed with ${crew.name}! 🎬`, {
        style: {
          background: '#1e293b',
          color: '#f1f5f9',
          border: '1px solid #334155',
        },
        iconTheme: { primary: '#3b82f6', secondary: '#fff' },
        duration: 4000,
      });
      onClose();
    }, 1200);
  };

  const handleChange = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md glass-card rounded-2xl shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div>
            <h2 className="text-xl font-bold text-white">Book {crew.name}</h2>
            <p className="text-sm text-slate-400 mt-0.5">{crew.role}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Crew preview */}
        <div className="px-6 pt-4 flex items-center gap-3">
          <img src={crew.image} alt={crew.name} className="w-12 h-12 rounded-full object-cover bg-slate-700" />
          <div>
            <p className="text-white font-semibold text-sm">{crew.name}</p>
            <p className="text-slate-400 text-xs">₹{crew.hourlyRate?.toLocaleString()} / day</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Your Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Enter your full name"
                value={form.userName}
                onChange={(e) => handleChange('userName', e.target.value)}
                className={`w-full bg-slate-800 border text-white placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.userName ? 'border-red-500' : 'border-slate-700'
                }`}
              />
            </div>
            {errors.userName && <p className="text-red-400 text-xs mt-1">{errors.userName}</p>}
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Contact Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="tel"
                placeholder="10-digit mobile number"
                value={form.contact}
                onChange={(e) => handleChange('contact', e.target.value)}
                className={`w-full bg-slate-800 border text-white placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.contact ? 'border-red-500' : 'border-slate-700'
                }`}
              />
            </div>
            {errors.contact && <p className="text-red-400 text-xs mt-1">{errors.contact}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Project Description</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <textarea
                rows={3}
                placeholder="Describe your project requirements..."
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className={`w-full bg-slate-800 border text-white placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                  errors.description ? 'border-red-500' : 'border-slate-700'
                }`}
              />
            </div>
            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Booking Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="date"
                min={today}
                value={form.bookingDate}
                onChange={(e) => handleChange('bookingDate', e.target.value)}
                className={`w-full bg-slate-800 border text-white text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all [color-scheme:dark] ${
                  errors.bookingDate ? 'border-red-500' : 'border-slate-700'
                }`}
              />
            </div>
            {errors.bookingDate && <p className="text-red-400 text-xs mt-1">{errors.bookingDate}</p>}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 text-sm font-medium transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Booking...
                </>
              ) : (
                'Confirm Booking'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
