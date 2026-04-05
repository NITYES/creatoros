import { ArrowRight, Play, Sparkles } from 'lucide-react';

export const Hero = () => (
  <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
    {/* Background Decorative Glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-50/50 rounded-full blur-3xl -z-10" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-6 animate-fade-in">
        <Sparkles size={16} />
        <span>Now powered by GenAI</span>
      </div>

      <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
        The OS for the <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Modern Creator
        </span>
      </h1>

      <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-10 leading-relaxed">
        Stop juggling twenty tabs. Manage your content, track your analytics,
        and automate your workflow—all from a single, unified dashboard.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
          Start building for free <ArrowRight size={20} />
        </button>
        <button className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
          <Play size={20} fill="currentColor" /> Watch Demo
        </button>
      </div>

      {/* Hero Image / Mockup Placeholder */}
      <div className="mt-16 relative mx-auto max-w-5xl">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-2 shadow-2xl">
          <div className="rounded-xl border border-slate-200 bg-white aspect-video flex items-center justify-center text-slate-400">
            {/* Insert Dashboard Screenshot here */}
            <p className="text-sm font-medium uppercase tracking-widest">Dashboard Preview</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);