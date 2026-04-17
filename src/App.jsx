import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <div className="min-h-screen bg-slate-950">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* 404 fallback */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-950">
                  <p className="text-8xl font-black text-slate-800">404</p>
                  <p className="text-slate-400 text-xl">Page not found</p>
                  <a href="/" className="text-blue-400 hover:text-blue-300 transition-colors mt-2">
                    Go Home
                  </a>
                </div>
              }
            />
          </Routes>
          <Toaster position="bottom-right" />
        </div>
      </BookingProvider>
    </BrowserRouter>
  );
}

export default App;
