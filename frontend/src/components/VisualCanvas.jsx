// import React, { useRef, useEffect } from 'react'; // Removed useState from here
// import { Stage, Layer, Rect, Text, Group, Transformer } from 'react-konva';
// import { useDesign } from '../context/DesignContext';



// const VisualCanvas = () => {
//   // Pull EVERYTHING from Context so the Sidebar and Canvas are in sync
//   const { 
//     design, 
//     moveRoom, 
//     resizeRoom, 
//     selectedId, 
//     setSelectedId 
//   } = useDesign();
  
//   const trRef = useRef();
//   const SCALE = 15; // 1ft = 15px

//   // Sync Transformer to selected node
//   useEffect(() => {
//     if (selectedId && trRef.current) {
//       const node = trRef.current.getStage().findOne('#room-' + selectedId);
//       if (node) {
//         trRef.current.nodes([node]);
//         trRef.current.getLayer().batchDraw();
//       }
//     }
//   }, [selectedId, design.rooms]);

//   const handleTransformEnd = (e, id) => {
//     const node = e.target;
    
//     // Calculate the NEW dimensions in feet based on the SCALE
//     const newW = Math.max(1, Math.round((node.width() * node.scaleX()) / SCALE));
//     const newL = Math.max(1, Math.round((node.height() * node.scaleY()) / SCALE));

//     // Reset node scale so the width/height attributes take over properly
//     node.setAttrs({
//       width: newW * SCALE,
//       height: newL * SCALE,
//       scaleX: 1,
//       scaleY: 1
//     });

//     resizeRoom(id, newW, newL);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-full w-full bg-slate-200 p-8">
//       <div className="bg-white p-4 rounded-[2rem] shadow-2xl border-4 border-slate-300">
//         <Stage 
//           width={(design.plotWidth * SCALE) + 100} 
//           height={(design.plotLength * SCALE) + 100}
//           onMouseDown={(e) => {
//             // Deselect when clicking on the empty background
//             if (e.target === e.target.getStage()) setSelectedId(null);
//           }}
//         >
//           <Layer x={50} y={50}>
//             {/* Background Plot */}
//             <Rect 
//               width={design.plotWidth * SCALE} 
//               height={design.plotLength * SCALE} 
//               stroke="#cbd5e1" 
//               dash={[5, 5]} 
//             />
            
//             <Group x={design.setbackLeft * SCALE} y={design.setbackFront * SCALE}>
//               {design.rooms.map((room) => (
//                 <Rect 
//                   key={room.id}
//                   id={'room-' + room.id}
//                   x={room.x * SCALE} 
//                   y={room.y * SCALE}
//                   width={room.w * SCALE} 
//                   height={room.l * SCALE}
//                   fill={room.color || '#ffffff'} 
//                   stroke={selectedId === room.id ? "#6366f1" : "#1e293b"}
//                   strokeWidth={selectedId === room.id ? 3 : 2}
//                   draggable
//                   onClick={() => {
//                     // Toggle Logic
//                     if (selectedId === room.id) {
//                       setSelectedId(null);
//                     } else {
//                       setSelectedId(room.id);
//                     }
//                   }}
//                   onDragEnd={(e) => {
//                     const x = Math.round(e.target.x() / SCALE);
//                     const y = Math.round(e.target.y() / SCALE);
//                     moveRoom(room.id, x, y);
//                   }}
//                   onTransformEnd={(e) => handleTransformEnd(e, room.id)}
//                 />
//               ))}

//               {/* Text Layer (Separate to prevent text stretching) */}
//               {design.rooms.map((room) => (
//                 <Text 
//                   key={'text-' + room.id}
//                   x={room.x * SCALE} 
//                   y={room.y * SCALE}
//                   text={`${room.name}\n(${room.w}' x ${room.l}')`}
//                   width={room.w * SCALE}
//                   height={room.l * SCALE}
//                   align="center"
//                   verticalAlign="middle"
//                   fontSize={10}
//                   fontStyle="bold"
//                   listening={false} // Prevents text from blocking clicks on the Rect
//                 />
//               ))}

//               {selectedId && (
//                 <Transformer
//                   ref={trRef}
//                   rotateEnabled={false}
//                   keepRatio={false}
//                   boundBoxFunc={(oldBox, newBox) => {
//                     if (Math.abs(newBox.width) < SCALE || Math.abs(newBox.height) < SCALE) {
//                       return oldBox;
//                     }
//                     return newBox;
//                   }}
//                 />
//               )}
//             </Group>
//           </Layer>
//         </Stage>
//       </div>
//     </div>
//   );
// };

// export default VisualCanvas;


import React, { useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Text, Group, Transformer, Line, Arc } from 'react-konva';
import { useDesign } from '../context/DesignContext';
import { Download } from 'lucide-react';

import { Box, Map } from 'lucide-react';


const Door = ({ door, room, SCALE }) => {
  if (!room) return null;
  let x = room.x * SCALE;
  let y = room.y * SCALE;
  let rotation = 0;

  if (door.side === 'top') { x += door.offset * SCALE; rotation = 0; }
  else if (door.side === 'bottom') { x += door.offset * SCALE; y += room.l * SCALE; rotation = 180; }
  else if (door.side === 'left') { y += door.offset * SCALE; rotation = 270; }
  else if (door.side === 'right') { x += room.w * SCALE; y += door.offset * SCALE; rotation = 90; }

  return (
    <Group x={x} y={y} rotation={rotation}>
      <Arc
        innerRadius={door.width * SCALE}
        outerRadius={door.width * SCALE}
        angle={90}           // Total sweep of 90 degrees
        rotation={-270}       // Rotates the start point to match the leaf
        stroke="#94a3b8"
        strokeWidth={1}
        dash={[2, 2]}        // Optional: dashed line looks more "pro"
      />
      <Line points={[0, 0, door.width * SCALE, 0]} stroke="#1e293b" strokeWidth={3} rotation={90} />
    </Group>
  );
};

const VisualCanvas = () => {
  const { design, moveRoom, resizeRoom, selectedId, setSelectedId } = useDesign();
  const stageRef = useRef(null);
  const trRef = useRef();
  const SCALE = 15;

  // --- PRINT / EXPORT LOGIC ---
  const handleExport = () => {
    // 1. Deselect any room so the Transformer (blue box) doesn't appear in the print
    setSelectedId(null);
    
    // 2. Small timeout to let the state update and UI re-render without the blue lines
    setTimeout(() => {
      const uri = stageRef.current.toDataURL({ pixelRatio: 3 }); // High quality 3x
      const link = document.createElement('a');
      link.download = `FloorPlan-${Date.now()}.png`;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 100);
  };

  useEffect(() => {
    if (selectedId && trRef.current) {
      const node = trRef.current.getStage().findOne('#room-' + selectedId);
      if (node) { trRef.current.nodes([node]); trRef.current.getLayer().batchDraw(); }
    }
  }, [selectedId, design.rooms]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-slate-200 p-8 relative">
      
      {/* Export Button Overlay */}
      <button 
        onClick={handleExport}
        className="absolute top-12 right-12 z-20 bg-indigo-600 text-white px-6 py-3 rounded-full font-black flex items-center gap-2 shadow-xl hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95"
      >
        <Download size={20} /> Export PNG
      </button>

      <div className="bg-white p-6 rounded-[3rem] shadow-2xl border-8 border-slate-300">
        <Stage 
          ref={stageRef}
          width={(design.plotWidth * SCALE) + 100} 
          height={(design.plotLength * SCALE) + 100} 
          onMouseDown={e => e.target === e.target.getStage() && setSelectedId(null)}
        >
          <Layer x={50} y={50}>
            {/* Background Plot */}
            <Rect width={design.plotWidth * SCALE} height={design.plotLength * SCALE} fill="#ffffff" stroke="#cbd5e1" dash={[5, 5]} strokeWidth={2} />
            
            <Group x={design.setbackLeft * SCALE} y={design.setbackFront * SCALE}>
              {design.rooms.map(room => (
                <Rect 
                  key={room.id} 
                  id={'room-' + room.id} 
                  x={room.x * SCALE} 
                  y={room.y * SCALE} 
                  width={room.w * SCALE} 
                  height={room.l * SCALE} 
                  fill={room.color || '#ffffff'} 
                  stroke={selectedId === room.id ? "#6366f1" : "#1e293b"} 
                  strokeWidth={selectedId === room.id ? 3 : 2} 
                  cornerRadius={2} 
                  draggable 
                  onClick={() => {
                    // Toggle Logic
                    if (selectedId === room.id) {
                      setSelectedId(null);
                    } else {
                      setSelectedId(room.id);
                    }
                  }}
                  onDragEnd={e => moveRoom(room.id, Math.round(e.target.x() / SCALE), Math.round(e.target.y() / SCALE))} 
                  onTransformEnd={e => {
                    const node = e.target;
                    const newW = Math.max(1, Math.round((node.width() * node.scaleX()) / SCALE));
                    const newL = Math.max(1, Math.round((node.height() * node.scaleY()) / SCALE));
                    node.setAttrs({ width: newW * SCALE, height: newL * SCALE, scaleX: 1, scaleY: 1 });
                    resizeRoom(room.id, newW, newL);
                  }} 
                />
              ))}

              {design.doors.map(door => (
                <Door key={door.id} door={door} room={design.rooms.find(r => r.id === door.roomId)} SCALE={SCALE} />
              ))}

              {design.rooms.map(room => (
                <Text 
                  key={'text-' + room.id} 
                  x={room.x * SCALE} 
                  y={room.y * SCALE} 
                  text={`${room.name}\n(${room.w}'x${room.l}')`} 
                  width={room.w * SCALE} 
                  height={room.l * SCALE} 
                  align="center" 
                  verticalAlign="middle" 
                  fontSize={11} 
                  fontStyle="bold" 
                  fill="#475569" 
                  listening={false} 
                />
              ))}

              {selectedId && <Transformer ref={trRef} rotateEnabled={false} keepRatio={false} />}
            </Group>
          </Layer>
        </Stage>
      </div>
    </div>
  );
};



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


export default VisualCanvas;