

import React from 'react';
import SidebarForm from '../components/SidebarForm';
import VisualCanvas from '../components/VisualCanvas';
import ViewSwitcher from '../components/ViewSwitcher';
import { useDesign } from '../context/DesignContext';
import Scene3D from '../components/Scene3D';

function Editor() {
    const { view } = useDesign();
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* 1. Scrollable Form Side (Fixed Width) */}
      <aside className="w-[400px] h-full flex-shrink-0 shadow-2xl z-10">
        <SidebarForm />
      </aside>

      {/* 2. Live Design Side (Flexible Width) */}
      <main className="flex-1 h-full bg-slate-100 relative">
        <div className="absolute top-8 left-8">
          <h1 className="text-2xl font-black text-slate-800">2D Layout <span className="text-indigo-600">Engine</span></h1>
        </div>
         <div className="relative flex-1 h-screen bg-slate-100">
        {view === '2d' ? <VisualCanvas /> : <Scene3D />}
        <ViewSwitcher/>
      </div>
      </main>
    </div>
  )
}

export default Editor