import { createContext, useContext, useState } from 'react';

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([
    {
      id: 'BK001',
      crewId: 1,
      crewName: 'Aarav Sharma',
      crewRole: 'Director',
      crewImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aarav&backgroundColor=b6e3f4',
      userName: 'Vivek Singh',
      contact: '9876543210',
      description: 'Feature film project – 3-month shoot schedule starting June.',
      bookingDate: '2026-06-15',
      status: 'Confirmed',
      createdAt: '2026-04-10',
    },
    {
      id: 'BK002',
      crewId: 7,
      crewName: 'Arjun Bose',
      crewRole: 'Editor',
      crewImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun&backgroundColor=ffdfbf',
      userName: 'Vivek Singh',
      contact: '9876543210',
      description: 'Post-production editing for 5-episode web series.',
      bookingDate: '2026-05-01',
      status: 'Pending',
      createdAt: '2026-04-12',
    },
  ]);

  const addBooking = (booking) => {
    const id = `BK${String(bookings.length + 1).padStart(3, '0')}`;
    const newBooking = {
      ...booking,
      id,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    setBookings((prev) => [newBooking, ...prev]);

    // Simulating professional's approval after 5 seconds
    setTimeout(() => {
      setBookings((prev) =>
        prev.map((b) => (b.id === id && b.status === 'Pending' ? { ...b, status: 'Confirmed' } : b))
      );
    }, 5000);

    return newBooking;
  };

  const confirmBooking = (id) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'Confirmed' } : b))
    );
  };

  const cancelBooking = (id) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'Cancelled' } : b))
    );
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking, confirmBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside BookingProvider');
  return ctx;
};
