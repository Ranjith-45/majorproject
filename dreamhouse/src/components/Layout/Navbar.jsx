import React from 'react'
import { Search, User, Briefcase, SlidersHorizontal, ChevronDown, ChevronRight } from 'lucide-react';
function Navbar({tab,setTab}) {
  return (
    <nav className="border-b border-orange-500/20 sticky top-0 bg-zinc-950/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4"> {/* Reduced height to h-14 */}
          {/* Logo - Orange text */}
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-black text-orange-500 tracking-tighter">Dream House</h1>
            
            {/* Nav Links */}
            <div className="hidden lg:flex items-center gap-5 font-medium text-xs text-zinc-400">
              <button onClick={()=>{if(tab=='photos')setTab('home'); if(tab=='home')setTab('photos') }}  className="flex items-center gap-1 hover:text-orange-400 transition-colors">Photos <ChevronDown size={12}/></button>
              <button  className="flex items-center gap-1 hover:text-orange-400 transition-colors">Find Professionals <ChevronDown size={12}/></button>
              <a href="#" className="flex items-center gap-1 hover:text-orange-400 transition-colors">Stories <ChevronDown size={12}/></a>
              <a href="#" className="flex items-center gap-1 hover:text-orange-400 transition-colors">Advice <ChevronDown size={12}/></a>
            </div>
          </div>

          {/* Search Bar - Orange focus ring */}
          <div className="flex-1 max-w-lg relative">
            <input 
              type="text" 
              placeholder="Search interior inspiration..." 
              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-full py-1.5 pl-4 pr-10 focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500/50 outline-none transition-all placeholder:text-zinc-600 text-sm"
            />
            <Search className="absolute right-3 top-2 text-zinc-500" size={16} />
          </div>

          {/* Auth/Pro Links */}
          <div className="hidden md:flex items-center gap-5 text-xs font-semibold">
            <button className="flex items-center gap-2 text-zinc-300 hover:text-orange-400 transition-colors">
              <User size={18} /> Sign In
            </button>
            <button className="flex items-center gap-2 border border-orange-500/40 text-orange-500 px-4 py-1.5 rounded-full hover:bg-orange-500 hover:text-zinc-950 transition-all duration-300">
              <Briefcase size={16} /> Join as a Pro
            </button>
          </div>
        </div>
      </nav>
  )
}

export default Navbar