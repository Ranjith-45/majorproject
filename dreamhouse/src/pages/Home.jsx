import {  SlidersHorizontal, ChevronDown, ChevronRight } from 'lucide-react';
const Home = ()=> {

  const categories = [
    { name: 'Kitchen', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=300&q=80' },
    { name: 'Bath', img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=300&q=80' },
    { name: 'Bedroom', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-xKxHyDUrAmiMP5YWGkwBD7BuRxDv_6CABUqN7xugahEEr1Xlh2j4kzBP9g1g' },
    { name: 'Living', img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT4tdbNDnVmeQxp3rB3RLhu1jehelMHEDjlQm6GK4qvYzUW9p3sxxYwYTFfPTNE' },
    { name: 'Dining', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFrJVuItqFc6_zsWNwvpw1_J7aeMaS6nuYMTvrTBD8NGjDgT92i9W00Fq6Spcn' },
    { name: 'Outdoor', img: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSMKBhATI-2Ggu2j-bnRtOVHyUTzw1A4-x-pT9gCKHuNMrC-j3YCNtddRTm7wwE' },
    { name: 'Baby & Kids', img: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTeF3hLkHTerTrqqhSSFfQ4pxbVb-nJlhxiOnES-F0bL7wK8lQyJLNxdEEUxwwt' },
    { name: 'Home Office', img: 'https://images.unsplash.com/photo-1486946255434-2466348c2166?auto=format&fit=crop&w=300&q=80' },
  ];

  return(
    <main className="max-w-7xl mx-auto px-4 py-6"> {/* Reduced top padding to py-6 */}
        <header className="mb-6"> {/* Reduced margin-bottom */}
          <h2 className="text-3xl font-bold text-white mb-1">Home Design Photos</h2>
          
        </header>

        {/* --- Categories Horizontal Scroll --- */}
        <div className="relative group mb-8"> {/* Reduced margin-bottom */}
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 scroll-smooth">
            {categories.map((cat, index) => (
              <div key={index} className="flex-none w-36 cursor-pointer group/item">
                <div className="h-24 rounded-xl overflow-hidden border border-zinc-800 group-hover/item:border-orange-500/50 transition-colors">
                  <img 
                    src={cat.img} 
                    alt={cat.name} 
                    className="w-full h-full object-cover grayscale-[0.2] group-hover/item:grayscale-0 group-hover/item:scale-110 transition duration-500" 
                  />
                </div>
                <div className="mt-2 text-center text-xs font-medium text-zinc-400 group-hover/item:text-orange-400 transition-colors">
                  {cat.name}
                </div>
              </div>
            ))}
          </div>
          <button className="absolute right-0 top-10 translate-x-1/2 bg-zinc-900 border border-orange-500/30 text-white rounded-full p-2 shadow-2xl hover:bg-orange-500 hover:text-zinc-950 transition-all z-10 hidden md:block">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* --- Filter Controls --- */}
        {/* Horizontal line above filters using orange-zinc theme */}
        <div className="border-t border-orange-500/10 pt-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg font-medium text-xs hover:border-orange-500/50 transition-colors">
              <SlidersHorizontal size={14} /> All Filters
            </button>
            <button className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg font-medium text-xs hover:border-orange-500/50 transition-colors">
              Style <ChevronDown size={14} />
            </button>
          </div>
          <div className="text-xs text-zinc-500">
            Sort by: <span className="font-bold text-zinc-200 cursor-pointer hover:text-orange-400 transition-colors">Popular Today <ChevronDown size={12} className="inline ml-1"/></span>
          </div>
        </div>

        --- Content Grid ---
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"> {/* Reduced gap to 4 */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div 
              key={item} 
              className="bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden relative animate-pulse"
            >
              {/* Animated orange glow at the bottom of skeletons */}
              <div className="absolute bottom-3 left-3 right-3 h-3 bg-zinc-800 rounded-md"></div>
              <div className="absolute bottom-8 left-3 w-1/2 h-3 bg-zinc-800/50 rounded-md"></div>
            </div>
          ))}
        </div>
      </main>
  )

}

export default Home
