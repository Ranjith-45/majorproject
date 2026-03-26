import { Box, Map } from 'lucide-react';
import { useDesign } from '../context/DesignContext';

const ViewSwitcher = () => {
  const { view, setView } = useDesign();

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex bg-white/80 backdrop-blur-md p-1.5 rounded-2xl shadow-2xl border border-slate-200">
      <button
        onClick={() => setView('2d')}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
          view === '2d' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100'
        }`}
      >
        <Map size={18} /> 2D Plan
      </button>
      <button
        onClick={() => setView('3d')}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
          view === '3d' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100'
        }`}
      >
        <Box size={18} /> 3D Builder
      </button>
    </div>
  );
};

export default ViewSwitcher;