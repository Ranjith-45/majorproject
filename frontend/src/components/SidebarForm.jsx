// import React, { useEffect, useRef } from 'react';
// import { useDesign } from '../context/DesignContext';
// import { 
//   Trash2, 
//   X, 
//   Plus, 
//   Maximize2, 
//   Layers, 
//   Layout, 
//   MousePointer2 
// } from 'lucide-react';

// const SidebarForm = () => {
//   const { 
//     design, 
//     updatePlot, 
//     addRoom, 
//     updateRoom, 
//     removeRoom, 
//     selectedId, 
//     setSelectedId 
//   } = useDesign();

//   // Reference for the scrollable container
//   const sidebarRef = useRef(null);

//   // AUTO-SCROLL LOGIC: 
//   // Whenever a room is selected on the canvas, jump to the top of the sidebar
//   useEffect(() => {
//     if (selectedId && sidebarRef.current) {
//       sidebarRef.current.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//       });
//     }
//   }, [selectedId]);

//   // Find the currently active room object
//   const activeRoom = design.rooms.find(r => r.id === selectedId);

//   return (
//     <div 
//       ref={sidebarRef}
//       className="h-screen overflow-y-auto p-6 bg-white border-r border-slate-200 flex flex-col gap-8 custom-scrollbar shadow-inner"
//     >
//       {/* HEADER */}
//       <div className="flex items-center gap-3">
//         <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
//           <Layout className="text-white" size={24} />
//         </div>
//         <h2 className="text-2xl font-black text-slate-800 tracking-tight italic">
//           ArchStudio <span className="text-indigo-600 text-[10px] not-italic uppercase ml-1">v2.0</span>
//         </h2>
//       </div>

      

//       {/* --- 1. SELECTED ROOM HERO (The Command Center) --- */}
//       <section>
//         {activeRoom ? (

          

//           <div className="p-6 bg-indigo-600 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-200 animate-in fade-in slide-in-from-top-6 duration-300 ring-4 ring-indigo-50">

            

//             <div className="flex justify-between items-center mb-5">
//               <span className="text-[10px] font-black uppercase tracking-widest opacity-80 flex items-center gap-1">
//                 <MousePointer2 size={10} /> Room Inspector
//               </span>

//               <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
//                 {['#f8fafc', '#fee2e2', '#f0f9ff', '#f0fdf4', '#fefce8'].map(color => (
//                   <button
//                     key={color}
//                     onClick={() => updateRoom(activeRoom.id, 'color', color)}
//                     className={`w-6 h-6 rounded-full border-2 ${activeRoom.color === color ? 'border-white' : 'border-transparent'}`}
//                     style={{ backgroundColor: color }}
//                   />
//                 ))}
//               </div>

              



//               <button 
//                 onClick={() => setSelectedId(null)} 
//                 className="p-1.5 hover:bg-white/20 rounded-full transition-all"
//                 title="Deselect Room"
//               >
//                 <X size={18} />
//               </button>
//             </div>



            

            

//             <label className="text-[9px] font-bold uppercase opacity-60 mb-1 block">Rename Room</label>
//             <input 
//               value={activeRoom.name} 
//               onChange={(e) => updateRoom(activeRoom.id, 'name', e.target.value)}
//               className="bg-transparent text-2xl font-black outline-none border-b-2 border-white/20 w-full mb-6 pb-2 focus:border-white transition-colors"
//               placeholder="e.g. Master Bedroom"
//             />

//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
//                 <label className="text-[9px] font-black uppercase opacity-60 block mb-1">Width (ft)</label>
//                 <input 
//                   type="number" 
//                   value={activeRoom.w} 
//                   onChange={(e) => updateRoom(activeRoom.id, 'w', Number(e.target.value))}
//                   className="bg-transparent w-full font-black outline-none text-xl"
//                 />
//               </div>
//               <div className="bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
//                 <label className="text-[9px] font-black uppercase opacity-60 block mb-1">Length (ft)</label>
//                 <input 
//                   type="number" 
//                   value={activeRoom.l} 
//                   onChange={(e) => updateRoom(activeRoom.id, 'l', Number(e.target.value))}
//                   className="bg-transparent w-full font-black outline-none text-xl"
//                 />
//               </div>
//             </div>

//             <button 
//               onClick={() => { removeRoom(activeRoom.id); setSelectedId(null); }}
//               className="w-full mt-6 py-3 bg-red-500/20 hover:bg-red-500 text-white rounded-2xl text-xs font-bold transition-all border border-red-400/30 flex items-center justify-center gap-2"
//             >
//               <Trash2 size={14} /> Remove This Room
//             </button>
//           </div>
//         ) : (
//           <div className="p-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] text-center group hover:border-indigo-200 transition-colors">
//             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-slate-300 group-hover:text-indigo-400 transition-colors">
//               <MousePointer2 size={20} />
//             </div>
//             <p className="text-xs font-bold text-slate-400 leading-relaxed px-4">
//               Select a room on the canvas <br/> to access settings
//             </p>
//           </div>
//         )}
//       </section>

//       {/* --- 2. MASTER PLOT SETTINGS --- */}
//       <section>
//         <div className="flex items-center gap-2 mb-4">
//           <Maximize2 size={14} className="text-slate-400" />
//           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
//             Plot Dimensions
//           </h3>
//         </div>
//         <div className="grid grid-cols-2 gap-4">
//           <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-slate-300 transition-all">
//             <label className="text-[9px] font-bold text-slate-400 block mb-1">Total Width</label>
//             <input 
//               type="number" 
//               value={design.plotWidth} 
//               onChange={(e) => updatePlot('plotWidth', e.target.value)} 
//               className="w-full outline-none font-black text-slate-700 text-lg" 
//             />
//           </div>
//           <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-slate-300 transition-all">
//             <label className="text-[9px] font-bold text-slate-400 block mb-1">Total Length</label>
//             <input 
//               type="number" 
//               value={design.plotLength} 
//               onChange={(e) => updatePlot('plotLength', e.target.value)} 
//               className="w-full outline-none font-black text-slate-700 text-lg" 
//             />
//           </div>
//         </div>
//       </section>

//       {/* --- 3. ROOM INVENTORY --- */}
//       <section className="pb-10">
//         <div className="flex justify-between items-center mb-5">
//           <div className="flex items-center gap-2">
//             <Layers size={14} className="text-slate-400" />
//             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
//               Room Inventory ({design.rooms.length})
//             </h3>
//           </div>
//           <button 
//             onClick={addRoom} 
//             className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm flex items-center gap-2 text-xs font-bold"
//           >
//             <Plus size={16} /> Add Room
//           </button>
//         </div>

//         <div className="space-y-3">
//           {design.rooms.map((room) => (
//             <div 
//               key={room.id}
//               onClick={() => setSelectedId(room.id)}
//               className={`p-5 rounded-3xl border transition-all cursor-pointer flex justify-between items-center relative overflow-hidden group ${
//                 selectedId === room.id 
//                 ? 'bg-indigo-50 border-indigo-200 ring-2 ring-indigo-50' 
//                 : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-md'
//               }`}
//             >
//               <div className="relative z-10">
//                 <p className={`font-black text-sm transition-colors ${selectedId === room.id ? 'text-indigo-900' : 'text-slate-700'}`}>
//                   {room.name}
//                 </p>
//                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-1">
//                   {room.w}' × {room.l}' • <span className="text-slate-500">{room.w * room.l} sq.ft</span>
//                 </p>
//               </div>
              
//               {selectedId === room.id ? (
//                 <div className="w-2 h-8 bg-indigo-500 rounded-full" />
//               ) : (
//                 <button 
//                   onClick={(e) => {
//                     e.stopPropagation(); // Don't trigger selection
//                     removeRoom(room.id);
//                   }}
//                   className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 transition-all"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               )}
//             </div>
//           ))}
          
//           {design.rooms.length === 0 && (
//             <div className="text-center py-12 bg-slate-50/50 rounded-[2.5rem] border border-dashed border-slate-200">
//               <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest leading-loose">
//                 Floor Plan is Empty <br /> Start adding rooms
//               </p>
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default SidebarForm;

import React, { useEffect, useRef } from 'react';
import { useDesign } from '../context/DesignContext';
import { Trash2, X, Plus, Maximize2, Layers, Layout, MousePointer2, DoorOpen } from 'lucide-react';

const SidebarForm = () => {
  const { design, updatePlot, addRoom, updateRoom, removeRoom, selectedId, setSelectedId, addDoor, updateDoor, removeDoor } = useDesign();
  const sidebarRef = useRef(null);
  const activeRoom = design.rooms.find(r => r.id === selectedId);

  useEffect(() => { if (selectedId && sidebarRef.current) sidebarRef.current.scrollTo({ top: 0, behavior: 'smooth' }); }, [selectedId]);

  return (
    <div ref={sidebarRef} className="h-screen overflow-y-auto p-6 bg-white border-r border-slate-200 flex flex-col gap-8 shadow-inner custom-scrollbar">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200"><Layout className="text-white" size={24} /></div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight italic">ArchStudio <span className="text-indigo-600 text-[10px] not-italic uppercase ml-1">v2.0</span></h2>
      </div>

      <section>
        {activeRoom ? (
          <div className="p-6 bg-indigo-600 rounded-[2.5rem] text-white shadow-2xl animate-in fade-in slide-in-from-top-6 duration-300 ring-4 ring-indigo-50">
            <div className="flex justify-between items-center mb-5">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-80 flex items-center gap-1"><MousePointer2 size={10} /> Room Inspector</span>
              <button onClick={() => setSelectedId(null)} className="p-1.5 hover:bg-white/20 rounded-full transition-all"><X size={18} /></button>
            </div>

                          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
               {['#f8fafc', '#fee2e2', '#f0f9ff', '#f0fdf4', '#fefce8'].map(color => (
                 <button
                  key={color}
                   onClick={() => updateRoom(activeRoom.id, 'color', color)}
                     className={`w-6 h-6 rounded-full border-2 ${activeRoom.color === color ? 'border-white' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                  />
               ))}
              </div>
            
            <input value={activeRoom.name} onChange={(e) => updateRoom(activeRoom.id, 'name', e.target.value)} className="bg-transparent text-xl font-black outline-none border-b-2 border-white/20 w-full mb-6 pb-1 focus:border-white transition-colors" />

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
                <label className="text-[9px] font-black uppercase opacity-60 block">Width (ft)</label>
                <input type="number" value={activeRoom.w} onChange={(e) => updateRoom(activeRoom.id, 'w', Number(e.target.value))} className="bg-transparent w-full font-black outline-none text-lg" />
              </div>
              <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
                <label className="text-[9px] font-black uppercase opacity-60 block">Length (ft)</label>
                <input type="number" value={activeRoom.l} onChange={(e) => updateRoom(activeRoom.id, 'l', Number(e.target.value))} className="bg-transparent w-full font-black outline-none text-lg" />
              </div>
            </div>

            {/* OPENINGS SECTION */}
            <div className="mb-6 bg-black/10 p-4 rounded-[1.5rem] border border-white/5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-70 flex items-center gap-1"><DoorOpen size={12} /> Openings</span>
                <button onClick={() => addDoor(activeRoom.id)} className="text-[10px] bg-white text-indigo-600 px-3 py-1 rounded-full font-bold shadow-sm">+ Add Door</button>
              </div>
              <div className="space-y-2">
                {design.doors.filter(d => d.roomId === activeRoom.id).map(door => (
                  <div key={door.id} className="bg-white/10 p-2 rounded-xl flex items-center justify-between border border-white/10">
                    <select value={door.side} onChange={(e) => updateDoor(door.id, 'side', e.target.value)} className="bg-transparent text-[10px] font-bold outline-none cursor-pointer">
                      <option value="top" className="text-slate-800">Top</option>
                      <option value="bottom" className="text-slate-800">Bottom</option>
                      <option value="left" className="text-slate-800">Left</option>
                      <option value="right" className="text-slate-800">Right</option>
                    </select>
                    <input type="number" value={door.offset} onChange={(e) => updateDoor(door.id, 'offset', Number(e.target.value))} className="w-8 bg-transparent text-[10px] text-center font-bold outline-none border-b border-white/20" />
                    <button onClick={() => removeDoor(door.id)} className="text-white/40 hover:text-red-300"><Trash2 size={12} /></button>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => { removeRoom(activeRoom.id); setSelectedId(null); }} className="w-full py-3 bg-red-500/20 hover:bg-red-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-red-400/30 flex items-center justify-center gap-2"><Trash2 size={14} /> Remove Room</button>
          </div>
        ) : (
          <div className="p-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] text-center text-slate-300 group hover:border-indigo-200">
            <MousePointer2 size={20} className="mx-auto mb-3" /><p className="text-xs font-bold text-slate-400">Select a room to edit</p>
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4"><Maximize2 size={14} className="text-slate-400" /><h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Plot Dimensions</h3></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm"><label className="text-[9px] font-bold text-slate-400 block mb-1 uppercase">Width</label><input type="number" value={design.plotWidth} onChange={(e) => updatePlot('plotWidth', e.target.value)} className="w-full outline-none font-black text-slate-700 text-lg" /></div>
          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm"><label className="text-[9px] font-bold text-slate-400 block mb-1 uppercase">Length</label><input type="number" value={design.plotLength} onChange={(e) => updatePlot('plotLength', e.target.value)} className="w-full outline-none font-black text-slate-700 text-lg" /></div>
        </div>
      </section>
      
      <section className="pb-10">
        <div className="flex justify-between items-center mb-5"><div className="flex items-center gap-2"><Layers size={14} className="text-slate-400" /><h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inventory ({design.rooms.length})</h3></div><button onClick={addRoom} className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm flex items-center gap-2 text-xs font-bold"><Plus size={16} /> Add</button></div>
        <div className="space-y-3">
          {design.rooms.map(room => (
            <div key={room.id} onClick={() => setSelectedId(room.id)} className={`p-5 rounded-3xl border transition-all cursor-pointer flex justify-between items-center group ${selectedId === room.id ? 'bg-indigo-50 border-indigo-200 ring-2 ring-indigo-50' : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-md'}`}>
              <div><p className={`font-black text-sm ${selectedId === room.id ? 'text-indigo-900' : 'text-slate-700'}`}>{room.name}</p><p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{room.w}' × {room.l}' • {room.w * room.l} sq.ft</p></div>
              {selectedId !== room.id && <button onClick={(e) => { e.stopPropagation(); removeRoom(room.id); }} className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 transition-all"><Trash2 size={16} /></button>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default SidebarForm;