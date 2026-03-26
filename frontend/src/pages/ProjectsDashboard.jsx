import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Folder, Layout, Trash2, Loader2, Edit3, LogOut, Search } from 'lucide-react';
import { apiConnector } from '../services/apiConnectors'; 
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const ProjectsDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  // 1. Initial Load
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await apiConnector("GET", "/projects");
      setProjects(response.data);
    } catch (err) {
      toast.error("Failed to sync with cloud vault");
      console.error("FETCH_ERROR:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Create Project with Name Prompt
  const handleCreateNew = async () => {
    const projectName = window.prompt("Name your new architectural blueprint:", "New Layout");
    if (!projectName) return; // Exit if cancelled or empty

    const bodyData = { 
      name: projectName,
      designData: { rooms: [], doors: [] } 
    };

    try {
      const response = await apiConnector("POST", "/projects", bodyData);
      toast.success("Blueprint Initialized");
      navigate(`/editor/${response.data._id}`);
    } catch (err) {
      toast.error("Initialization failed");
    }
  };

  // 3. Rename Existing Project
  const handleRename = async (e, id, currentName) => {
    e.stopPropagation();
    const newName = window.prompt("Rename blueprint:", currentName);
    if (!newName || newName === currentName) return;

    try {
      await apiConnector("PUT", `/projects/${id}`, { name: newName });
      setProjects(projects.map(p => p._id === id ? { ...p, name: newName } : p));
      toast.success("Identity Updated");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  // 4. Delete Project
  const handleDelete = async (e, id) => {
    e.stopPropagation(); 
    if (!window.confirm("Terminate this blueprint permanently? This cannot be undone.")) return;

    try {
      await apiConnector("DELETE", `/projects/${id}`);
      setProjects((prev) => prev.filter(p => p._id !== id));
      toast.success("Data Purged");
    } catch (err) {
      toast.error("Termination failed");
    }
  };

  // Filter logic for search
  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {/* --- TOP NAVIGATION BAR --- */}
      <nav className="border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)]">
              <Layout size={18} className="text-white" />
            </div>
            <span className="font-black text-xl tracking-tighter text-white">NEON<span className="text-indigo-500">ARCH</span></span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3 px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-full">
               <img src={user?.profile?.avatar} alt="avatar" className="w-6 h-6 rounded-full border border-indigo-500/50" />
               <span className="text-xs font-bold text-slate-300">{user?.profile?.fullName || "Architect"}</span>
            </div>
            <button onClick={logout} className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors text-slate-500">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* --- DASHBOARD HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">Mission Control</h1>
            <p className="text-slate-500 mt-2">Manage your high-precision architectural drafts.</p>
          </div>

          <div className="flex w-full md:w-auto gap-3">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Search blueprints..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={handleCreateNew}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-95 whitespace-nowrap"
            >
              <Plus size={18} /> New Draft
            </button>
          </div>
        </div>

        {/* --- CONTENT GRID --- */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-500">
            <Loader2 className="animate-spin mb-4 text-indigo-500" size={40} />
            <p className="font-mono text-[10px] uppercase tracking-[0.3em]">Accessing Cloud Vault...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-24 border-2 border-dashed border-slate-800 rounded-[2rem] bg-slate-900/20">
            <Folder className="mx-auto text-slate-800 mb-4" size={64} />
            <h2 className="text-xl font-bold text-slate-400">No Blueprints Found</h2>
            <p className="text-slate-600 mb-8 max-w-xs mx-auto text-sm">Your architectural vault is empty. Initialize a new project to begin drafting.</p>
            <button onClick={handleCreateNew} className="text-indigo-400 hover:text-indigo-300 font-bold underline underline-offset-8">
              Launch First Session
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((proj) => (
              <div 
                key={proj._id}
                onClick={() => navigate(`/editor/${proj._id}`)}
                className="group relative bg-[#161e31] border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 cursor-pointer transition-all duration-300 shadow-xl"
              >
                {/* Actions overlay */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => handleRename(e, proj._id, proj.name)}
                    className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:text-white"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button 
                    onClick={(e) => handleDelete(e, proj._id)}
                    className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="aspect-video bg-slate-900/50 rounded-xl mb-5 flex items-center justify-center border border-slate-800/50 group-hover:bg-slate-800 transition-colors overflow-hidden">
                  <Layout className="text-slate-800 group-hover:text-indigo-500/30 transition-all group-hover:scale-110" size={48} />
                </div>

                <h3 className="font-bold text-white text-lg truncate group-hover:text-indigo-400 transition-colors">{proj.name}</h3>
                
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-800/50">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">
                    Rev: {new Date(proj.updatedAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Cloud Synced</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectsDashboard;