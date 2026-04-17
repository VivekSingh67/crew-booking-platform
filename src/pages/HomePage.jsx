import { Link } from 'react-router-dom';
import { ArrowRight, Star, BadgeCheck, Users, TrendingUp, Clapperboard, Zap, Shield } from 'lucide-react';
import { crewData } from '../data/crewData';
import CrewCard from '../components/CrewCard';

const stats = [
  { label: 'Verified Professionals', value: '500+', icon: BadgeCheck },
  { label: 'Successful Bookings', value: '2,000+', icon: TrendingUp },
  { label: 'Avg. Rating', value: '4.7★', icon: Star },
  { label: 'Active Projects', value: '120+', icon: Clapperboard },
];

const features = [
  {
    icon: BadgeCheck,
    title: 'Verified Professionals',
    desc: 'Every professional is thoroughly vetted and verified for quality assurance.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Zap,
    title: 'Instant Booking',
    desc: 'Book your ideal crew member in minutes with a seamless booking experience.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    desc: 'All transactions are secured and protected with escrow-based payments.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
  },
  {
    icon: Users,
    title: 'Top-Tier Talent',
    desc: 'Access directors, DPs, editors, sound engineers, and more all in one place.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
  },
];

const HomePage = () => {
  const featured = crewData.filter((c) => c.rating >= 4.7).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.1),transparent_50%)]" />

        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium px-4 py-2 rounded-full mb-8 animate-fade-in">
            <BadgeCheck className="w-4 h-4" />
            India's #1 Film Crew Booking Platform
          </div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            Find the Perfect
            <br />
            <span className="gradient-text">Film Crew</span>
            <br />
            for Your Vision
          </h1>

          <p
            className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            Connect with verified directors, cinematographers, editors, and 100+ other
            professionals who bring stories to life.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            <Link
              to="/browse"
              id="browse-crew-btn"
              className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-blue-600/30 hover:shadow-blue-500/40 hover:scale-105"
            >
              <Users className="w-5 h-5" />
              Browse Crew
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 border border-slate-700 hover:border-blue-500/50 text-slate-300 hover:text-white font-semibold text-lg px-8 py-4 rounded-2xl transition-all duration-300 hover:bg-slate-800"
            >
              My Dashboard
            </Link>
          </div>

          {/* Search bar hint */}
          <div
            className="mt-12 flex items-center justify-center gap-3 text-slate-500 text-sm animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            <span>Popular:</span>
            {['Director', 'Cinematographer', 'Editor', 'VFX Artist'].map((tag) => (
              <Link
                key={tag}
                to={`/browse?role=${tag}`}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1 rounded-full text-xs transition-colors border border-slate-700"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-blue-500/10 rounded-xl">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <div className="text-3xl font-black text-white mb-1">{value}</div>
                <div className="text-slate-400 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Crew */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-2">Top Rated</p>
              <h2 className="text-4xl font-black text-white">Featured Professionals</h2>
            </div>
            <Link
              to="/browse"
              className="hidden sm:flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors group"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((crew, i) => (
              <div
                key={crew.id}
                className="animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <CrewCard crew={crew} />
              </div>
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              View All Crew <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-2">Why CrewHub</p>
            <h2 className="text-4xl font-black text-white">Everything You Need</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc, color, bg }) => (
              <div
                key={title}
                className="glass-card rounded-2xl p-6 hover:border-blue-500/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`inline-flex p-3 rounded-xl ${bg} mb-4`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 p-12 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15),transparent_70%)]" />
            <div className="relative">
              <h2 className="text-4xl font-black text-white mb-4">Ready to Build Your Dream Team?</h2>
              <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of filmmakers who trust CrewHub to find the best professionals.
              </p>
              <Link
                to="/browse"
                className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold text-lg px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all duration-300 shadow-xl hover:scale-105"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-10 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 bg-blue-600 rounded-xl">
              <Clapperboard className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              Crew<span className="text-blue-400">Hub</span>
            </span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2026 CrewHub. India's Premier Film Crew Booking Platform.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
