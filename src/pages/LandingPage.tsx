import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import Header from '../components/layout/header';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { Navigate } from 'react-router-dom';
const LandingPage = () => {

  const { isAuthenticated } = useSelector((state: RootState) => state.user) // Placeholder for future user state checks
  if (isAuthenticated) {
    // 'replace' prevents the user from going 'back' to the landing page
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-700">
      <Header />
      <Hero />
      <Features />

      {/* Simple Footer */}
      <footer id="contact" className="py-12 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} creatorOS. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center gap-6 text-slate-400 text-sm">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
            <a href="mailto:hello@creatoros.com" className="hover:text-indigo-600 transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;