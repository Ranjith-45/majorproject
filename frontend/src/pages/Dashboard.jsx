import { Plus, Folder, Clock } from 'lucide-react';

export default function Dashboard({ onNewProject }) {
  const projects = [
    { id: 1, name: "Modern Villa", updated: "2 mins ago" },
    { id: 2, name: "Studio Apt", updated: "1 hour ago" },
  ];

  return (
    <div className="min-h-screen bg-gh-bg text-gray-300 p-8 font-mono">
      <header className="flex justify-between items-center mb-12 border-b border-gh-border pb-6">
        <h1 className="text-2xl font-bold text-gh-neon tracking-tighter">ARCH_STUDIO / PROJECTS</h1>
        <button 
          onClick={onNewProject}
          className="bg-gh-accent/20 border border-gh-accent text-gh-accent px-4 py-2 rounded-md hover:bg-gh-accent hover:text-gh-bg transition-all flex items-center gap-2"
        >
          <Plus size={18} /> New Project
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map(p => (
          <div key={p.id} className="bg-gh-panel border border-gh-border p-6 rounded-lg hover:border-gh-neon transition-all cursor-pointer group">
            <Folder className="text-gh-neon mb-4 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-lg font-bold text-white mb-2">{p.name}</h3>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock size={12} /> {p.updated}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}