import { useState, useEffect } from 'react';
import { Link,  } from 'react-router-dom'; // Essential for internal routing
import { Menu, X, Laptop, ArrowRight, UserPlus } from 'lucide-react';
import { useSelector } from 'react-redux';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { currentUser, isAuthenticated } = useSelector((state: any) => state.user); // Placeholder for future user state checks

  // Handle scroll for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#features' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${isScrolled
        ? 'bg-white/80 backdrop-blur-lg border-b border-slate-200/50 py-3'
        : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo - Clicking this returns to Home */}
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-transform">
              <Laptop size={22} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              creator<span className="text-indigo-600">OS</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-8">
              {isAuthenticated ? (
                <>
                  <span className="text-sm font-semibold text-slate-600">Welcome, {currentUser.name}</span>
                  <button
                    onClick={() => {
                      // Placeholder for logout logic
                      console.log('Logging out...');
                    }}
                    className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
                  >
                    Logout
                  </button>
                  <Link to='/application'>Application</Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
                  >
                    Log in
                  </Link>

                  {/* PRIMARY SIGNUP BUTTON */}
                  <Link
                    to="/signup"
                    className="bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-100 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                  >
                    Join Free <ArrowRight size={16} />
                  </Link>
                </>
              )}
            </div>

          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0 shadow-2xl' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
      >
        <div className="p-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-lg font-semibold text-slate-800 hover:text-indigo-600"
            >
              {link.name}
            </a>
          ))}

          <div className="pt-6 border-t border-slate-100 space-y-3">
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
            >
              Get Started Free <UserPlus size={18} />
            </Link>
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-slate-500 py-3 font-bold text-center block text-sm"
            >
              Already have an account? <span className="text-indigo-600">Log in</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;