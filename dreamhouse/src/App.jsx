import React, { useEffect,useState } from 'react';
import { Search, User, Briefcase, SlidersHorizontal, ChevronDown, ChevronRight } from 'lucide-react';

import axios from 'axios';
import Home from './pages/Home';
import  Photos from './pages/Photos';
import Navbar from './components/Layout/Navbar';

const DreamBuildingPage = () => {
  
  const [tab,setTab] = useState('home');

  return (
   
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 selection:bg-orange-500/30">
      
      <Navbar tab={tab} setTab={setTab} />
      {tab=='home' && <Home/>}
      {tab=='photos' && <Photos/>}

      

    </div>
  );
};

export default DreamBuildingPage;