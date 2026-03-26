import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Box, ArrowRight, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // If user is already logged in, redirect them to the Editor immediately
  if (user) {
    navigate('/editor');
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white selection:bg-indigo-500/30">
      {/* --- HERO SECTION --- */}
      <header className="relative px-6 py-24 md:py-32 lg:py-48 flex flex-col items-center text-center overflow-hidden">
        {/* Background Decorative Blur */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
            <Zap size={14} />
            <span>v1.0 Now in Public Beta</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8">
            Build the Future with <br />
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              NeonArch Engine
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The professional browser-based tool for 2D drafting and 3D visualization. 
            Design rooms, place structures, and render blueprints in real-time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="group relative flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 transition-all rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(79,70,229,0.4)]"
            >
              Get Started Free
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            
            <button className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl font-bold text-lg transition-colors">
              View Showcase
            </button>
          </div>
        </div>
      </header>

      {/* --- FEATURE GRID --- */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition-colors">
          <Layout className="text-indigo-400 mb-4" size={32} />
          <h3 className="text-xl font-bold mb-2">2D Drafting</h3>
          <p className="text-slate-400">Precision room building with automated wall snapping and dimensioning.</p>
        </div>
        <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition-colors">
          <Box className="text-cyan-400 mb-4" size={32} />
          <h3 className="text-xl font-bold mb-2">3D Rendering</h3>
          <p className="text-slate-400">Instantly convert your 2D plans into immersive 3D scenes with one click.</p>
        </div>
        <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition-colors">
          <Zap className="text-purple-400 mb-4" size={32} />
          <h3 className="text-xl font-bold mb-2">Cloud Sync</h3>
          <p className="text-slate-400">All your blueprints are stored securely in the cloud via MongoDB.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;