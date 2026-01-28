import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Palette, ChevronLeft, ChevronRight, Loader2, Download } from 'lucide-react';

// --- Theme Definitions ---
const themes = {
  midnight: {
    name: 'Midnight',
    bg: 'bg-slate-950',
    text: 'text-slate-100',
    card: 'bg-slate-900',
    accent: 'bg-indigo-600 hover:bg-indigo-500',
    spinner: 'text-indigo-500', 
    border: 'border-slate-800'
  },
  sunset: {
    name: 'Sunset',
    bg: 'bg-orange-50',
    text: 'text-orange-950',
    card: 'bg-white',
    accent: 'bg-orange-500 hover:bg-orange-600',
    spinner: 'text-orange-500',
    border: 'border-orange-200'
  },
  ocean: {
    name: 'Ocean',
    bg: 'bg-cyan-950',
    text: 'text-cyan-50',
    card: 'bg-cyan-900/50',
    accent: 'bg-cyan-500 hover:bg-cyan-400',
    spinner: 'text-cyan-400',
    border: 'border-cyan-800'
  },
  forest: {
    name: 'Forest',
    bg: 'bg-stone-900',
    text: 'text-emerald-50',
    card: 'bg-stone-800',
    accent: 'bg-emerald-600 hover:bg-emerald-500',
    spinner: 'text-emerald-500',
    border: 'border-stone-700'
  },
  candy: {
    name: 'Candy',
    bg: 'bg-pink-50',
    text: 'text-pink-900',
    card: 'bg-white',
    accent: 'bg-rose-400 hover:bg-rose-500',
    spinner: 'text-rose-400',
    border: 'border-pink-200'
  },
  cyberpunk: {
    name: 'Cyberpunk',
    bg: 'bg-black',
    text: 'text-yellow-400',
    card: 'bg-zinc-900',
    accent: 'bg-yellow-400 text-black hover:bg-yellow-300',
    spinner: 'text-yellow-400',
    border: 'border-yellow-400/30'
  },
  minimal: {
    name: 'Minimal',
    bg: 'bg-gray-100',
    text: 'text-gray-900',
    card: 'bg-white',
    accent: 'bg-black text-white hover:bg-gray-800',
    spinner: 'text-black',
    border: 'border-gray-200'
  },
  luxury: {
    name: 'Luxury',
    bg: 'bg-neutral-900',
    text: 'text-amber-100',
    card: 'bg-neutral-800',
    accent: 'bg-amber-600 hover:bg-amber-500',
    spinner: 'text-amber-500',
    border: 'border-amber-900'
  }
};

// --- NEW COMPONENT: Handles individual image loading ---
const ImageCard = ({ elem, theme }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`group relative overflow-hidden rounded-3xl shadow-lg border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${theme.card} ${theme.border}`}>
      
      {/* Image Container with Fixed Height */}
      <div className="relative h-64 w-full overflow-hidden bg-black/5 flex items-center justify-center">
        
        {/* LOADER: Shows only when image is NOT loaded */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
             <Loader2 className={`w-10 h-10 animate-spin ${theme.spinner}`} />
          </div>
        )}

        {/* IMAGE: Hidden until loaded, then fades in */}
        <img 
          className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
          src={elem.download_url} 
          alt={elem.author} 
          onLoad={() => setImageLoaded(true)}
        />

        {/* Overlay on Hover (Only shows if image is loaded) */}
        {imageLoaded && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <a 
              href={elem.url} 
              target="_blank" 
              rel="noreferrer"
              className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition"
            >
              <Download size={24} />
            </a>
          </div>
        )}
      </div>

      {/* Card Info - ID REMOVED */}
      <div className="p-5 flex justify-between items-center">
        <h2 className="font-bold text-lg truncate w-full">{elem.author}</h2>
      </div>
    </div>
  );
};

const App = () => {
  const [userData, setUserData] = useState([]);
  const [index, setIndex] = useState(1);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [currentTheme, setCurrentTheme] = useState('midnight');
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const theme = themes[currentTheme];

  const getData = async () => {
    setIsFetchingData(true);
    try {
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${index}&limit=20`
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsFetchingData(false);
    }
  };

  useEffect(() => {
    getData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [index]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme.bg} ${theme.text} font-sans`}>
      
      {/* --- Navbar --- */}
      <nav className={`sticky top-0 z-50 backdrop-blur-md border-b ${theme.border} bg-opacity-80 px-6 py-4 flex justify-between items-center`}>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tighter flex items-center gap-2">
          <span className={`w-3 h-8 rounded-full ${theme.accent}`}></span>
          Dream House<span className="opacity-70 font-light">Gallery</span>
        </h1>

        <div className="relative">
          <button 
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            className={`p-2 rounded-full border transition-all hover:scale-105 active:scale-95 ${theme.border} ${theme.card}`}
          >
            <Palette size={24} />
          </button>
          
          {/* Theme Dropdown */}
          {showThemeMenu && (
            <div className={`absolute right-0 mt-4 w-48 p-2 rounded-xl shadow-2xl border grid grid-cols-1 gap-1 z-50 ${theme.card} ${theme.border}`}>
              {Object.keys(themes).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setCurrentTheme(key);
                    setShowThemeMenu(false);
                  }}
                  className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-80 flex items-center gap-2 ${themes[key].bg} ${themes[key].text}`}
                >
                  <div className={`w-3 h-3 rounded-full ${themes[key].accent}`} />
                  {themes[key].name}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* --- Main Content --- */}
      <main className="max-w-7xl mx-auto px-4 py-8 min-h-[80vh]">
        
        {}
        {isFetchingData && userData.length === 0 ? (
           <div className="flex flex-col justify-center items-center h-[60vh]">
             <Loader2 className={`w-12 h-12 animate-spin ${theme.spinner}`} />
           </div>
        ) : (
          <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in slide-in-from-bottom-4 duration-700">
              {userData.map((elem) => (
                <ImageCard key={elem.id} elem={elem} theme={theme} />
              ))}
            </div>

            {/* --- Pagination --- */}
            <div className="flex justify-center items-center gap-8 mt-16 pb-10">
              <button 
                disabled={index <= 1}
                onClick={() => setIndex((prev) => Math.max(prev - 1, 1))}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 ${theme.accent} ${currentTheme === 'cyberpunk' ? 'text-black' : 'text-white'}`}
              >
                <ChevronLeft size={20} /> Prev
              </button>

              <div className={`px-6 py-2 rounded-2xl font-mono text-xl border-2 ${theme.border}`}>
                Page {index}
              </div>

              <button 
                onClick={() => setIndex((prev) => prev + 1)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-lg transition-all disabled:opacity-50 hover:scale-105 active:scale-95 ${theme.accent} ${currentTheme === 'cyberpunk' ? 'text-black' : 'text-white'}`}
              >
                Next <ChevronRight size={20} />
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default App;