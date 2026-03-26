// import React, { Suspense } from 'react';
// import * as THREE from 'three'; // <--- ADD THIS LINE
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, ContactShadows, Environment, PerspectiveCamera } from '@react-three/drei';
// import { useDesign } from '../context/DesignContext';

// const Room3D = ({ room }) => {
//   const wallHeight = 8; // 8ft ceiling
  
//   return (
//     // We adjust the position so the corner of the room starts at x,y
//     // Three.js uses (x, y, z) where Y is UP. 
//     // We map 2D (x, y) to 3D (x, z).
//     <group position={[room.x + room.w / 2, 0, room.y + room.l / 2]}>
      
//       {/* 1. THE FLOOR */}
//       <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]} receiveShadow>
//         <planeGeometry args={[room.w, room.l]} />
//         <meshStandardMaterial color={room.color || "#ffffff"} roughness={1} />
//       </mesh>

//       {/* 2. THE WALLS (Semi-transparent volume) */}
//       <mesh position={[0, wallHeight / 2, 0]}>
//         <boxGeometry args={[room.w, wallHeight, room.l]} />
//         <meshStandardMaterial 
//           color="#e2e8f0" 
//           transparent 
//           opacity={0.2} 
//           metalness={0.1}
//         />
//       </mesh>

//       {/* 3. THE ARCHITECTURAL EDGES (Uses the THREE namespace) */}
//       <lineSegments position={[0, wallHeight / 2, 0]}>
//         <edgesGeometry args={[new THREE.BoxGeometry(room.w, wallHeight, room.l)]} />
//         <lineBasicMaterial color="#6366f1" linewidth={2} />
//       </lineSegments>

//       {/* 4. 3D FLOATING LABEL */}
//       {/* Optional: You can add HTML labels here using <Html> from @react-three/drei */}
//     </group>
//   );
// };

// const Scene3D = () => {
//   const { design } = useDesign();

//   return (
//     <div className="h-full w-full bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-800 relative">
//       <Canvas shadows>
//         <PerspectiveCamera makeDefault position={[60, 60, 60]} fov={40} />
//         <Suspense fallback={null}>
//           <Environment preset="city" />
//           <ambientLight intensity={0.6} />
//           <pointLight position={[20, 30, 10]} intensity={1.5} castShadow />
          
//           {/* Ground / The Site */}
//           <mesh rotation={[-Math.PI / 2, 0, 0]} position={[design.plotWidth/2, 0, design.plotLength/2]}>
//             <planeGeometry args={[design.plotWidth * 2, design.plotLength * 2]} />
//             <meshStandardMaterial color="#0f172a" />
//           </mesh>

//           {/* Grid Helper for scale */}
//           <gridHelper args={[100, 20, "#334155", "#1e293b"]} position={[25, 0.1, 20]} />

//           {/* Render Rooms from Context */}
//           {design.rooms.map((room) => (
//             <Room3D key={room.id} room={room} />
//           ))}

//           <OrbitControls 
//             makeDefault 
//             minPolarAngle={0} 
//             maxPolarAngle={Math.PI / 2.1} 
//             enableDamping={true}
//           />
//           <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={100} blur={2.5} far={10} />
//         </Suspense>
//       </Canvas>
      
//       {/* UI Overlay */}
//       <div className="absolute top-6 left-6 pointer-events-none">
//         <h3 className="text-white font-black text-xl italic tracking-tighter">3D EXPLORER</h3>
//         <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest">Live Sync Active</p>
//       </div>
//     </div>
//   );
// };

// export default Scene3D;
















// import React, { Suspense } from 'react';
// import * as THREE from 'three';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, ContactShadows, Environment, PerspectiveCamera, Float } from '@react-three/drei';
// import { useDesign } from '../context/DesignContext';

// const Door3D = ({ door, room }) => {
//   const doorWidth = door.width || 3;
//   const doorHeight = 7; // Standard 7ft door
//   const thickness = 0.6; // Slightly thicker than wall for visibility
  
//   // Calculate Position
//   let relX = 0;
//   let relZ = 0;
//   let rotationY = 0;

//   if (door.side === 'top') {
//     relX = (door.offset + doorWidth / 2) - (room.w / 2);
//     relZ = -room.l / 2;
//     rotationY = 0;
//   } else if (door.side === 'bottom') {
//     relX = (door.offset + doorWidth / 2) - (room.w / 2);
//     relZ = room.l / 2;
//     rotationY = 0;
//   } else if (door.side === 'left') {
//     relX = -room.w / 2;
//     relZ = (door.offset + doorWidth / 2) - (room.l / 2);
//     rotationY = Math.PI / 2;
//   } else if (door.side === 'right') {
//     relX = room.w / 2;
//     relZ = (door.offset + doorWidth / 2) - (room.l / 2);
//     rotationY = Math.PI / 2;
//   }

//   return (
//     <group position={[relX, doorHeight / 2, relZ]} rotation={[0, rotationY, 0]}>
//       {/* THE DOOR LEAF (The actual door) */}
//       <mesh position={[0, 0, 0]}>
//         <boxGeometry args={[doorWidth, doorHeight, 0.1]} />
//         <meshStandardMaterial color="#92400e" metalness={0.2} roughness={0.8} />
//       </mesh>
      
//       {/* DOOR FRAME / TRIM */}
//       <lineSegments>
//         <edgesGeometry args={[new THREE.BoxGeometry(doorWidth, doorHeight, 0.2)]} />
//         <lineBasicMaterial color="#451a03" />
//       </lineSegments>
//     </group>
//   );
// };

// const Room3D = ({ room, doors }) => {
//   const wallHeight = 9;
  
//   return (
//     <group position={[room.x + room.w / 2, 0, room.y + room.l / 2]}>
//       {/* FLOOR */}
//       <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
//         <planeGeometry args={[room.w, room.l]} />
//         <meshStandardMaterial color={room.color || "#ffffff"} roughness={1} />
//       </mesh>

//       {/* WALLS (Transparent wireframe style) */}
//       <mesh position={[0, wallHeight / 2, 0]}>
//         <boxGeometry args={[room.w, wallHeight, room.l]} />
//         <meshStandardMaterial color="#cbd5e1" transparent opacity={0.15} />
//       </mesh>

//       {/* ARCHITECTURAL OUTLINES */}
//       <lineSegments position={[0, wallHeight / 2, 0]}>
//         <edgesGeometry args={[new THREE.BoxGeometry(room.w, wallHeight, room.l)]} />
//         <lineBasicMaterial color="#6366f1" transparent opacity={0.5} />
//       </lineSegments>

//       {/* RENDER DOORS BELONGING TO THIS ROOM */}
//       {doors.map(door => (
//         <Door3D key={door.id} door={door} room={room} />
//       ))}
//     </group>
//   );
// };

// const Scene3D = () => {
//   const { design } = useDesign();

//   return (
//     <div className="h-full w-full bg-slate-900 rounded-[3rem] overflow-hidden relative shadow-inner">
//       <Canvas shadows>
//         <PerspectiveCamera makeDefault position={[40, 40, 40]} fov={45} />
//         <Suspense fallback={null}>
//           <Environment preset="apartment" />
//           <ambientLight intensity={0.5} />
//           <pointLight position={[10, 20, 10]} intensity={1.5} castShadow />

//           {/* Render Rooms & their respective doors */}
//           {design.rooms.map((room) => (
//             <Room3D 
//               key={room.id} 
//               room={room} 
//               doors={design.doors.filter(d => d.roomId === room.id)} 
//             />
//           ))}

//           <OrbitControls makeDefault enableDamping dampingFactor={0.05} />
//           <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={50} blur={2} />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// };

// export default Scene3D;


/////// online=> 

// import React, { Suspense } from 'react';
// import * as THREE from 'three';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, ContactShadows, Environment, PerspectiveCamera } from '@react-three/drei';
// import { useDesign } from '../context/DesignContext';

// const Door3D = ({ door, room }) => {
//   const doorWidth = door.width || 3;
//   const doorHeight = 7;
  
//   let relX = 0;
//   let relZ = 0;
//   let rotationY = 0;

//   // Door positioning logic
//   if (door.side === 'top') {
//     relX = (door.offset + doorWidth / 2) - (room.w / 2);
//     relZ = -room.l / 2;
//   } else if (door.side === 'bottom') {
//     relX = (door.offset + doorWidth / 2) - (room.w / 2);
//     relZ = room.l / 2;
//   } else if (door.side === 'left') {
//     relX = -room.w / 2;
//     relZ = (door.offset + doorWidth / 2) - (room.l / 2);
//     rotationY = Math.PI / 2;
//   } else if (door.side === 'right') {
//     relX = room.w / 2;
//     relZ = (door.offset + doorWidth / 2) - (room.l / 2);
//     rotationY = Math.PI / 2;
//   }

//   return (
//     <group position={[relX, doorHeight / 2, relZ]} rotation={[0, rotationY, 0]}>
//       <mesh>
//         <boxGeometry args={[doorWidth, doorHeight, 0.15]} />
//         <meshStandardMaterial color="#92400e" roughness={0.6} />
//       </mesh>
//     </group>
//   );
// };

// const Room3D = ({ room, doors }) => {
//   const wallHeight = 9;
//   return (
//     <group position={[room.x + room.w / 2, 0, room.y + room.l / 2]}>
//       {/* ROOM FLOOR */}
//       <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
//         <planeGeometry args={[room.w, room.l]} />
//         <meshStandardMaterial color={room.color || "#ffffff"} />
//       </mesh>

//       {/* WALL VOLUME */}
//       <mesh position={[0, wallHeight / 2, 0]}>
//         <boxGeometry args={[room.w, wallHeight, room.l]} />
//         <meshStandardMaterial color="#f1f5f9" transparent opacity={0.1} />
//       </mesh>

//       {/* WALL EDGES */}
//       <lineSegments position={[0, wallHeight / 2, 0]}>
//         <edgesGeometry args={[new THREE.BoxGeometry(room.w, wallHeight, room.l)]} />
//         <lineBasicMaterial color="#6366f1" />
//       </lineSegments>

//       {doors.map(door => <Door3D key={door.id} door={door} room={room} />)}
//     </group>
//   );
// };

// const Scene3D = () => {
//   const { design } = useDesign();

//   // Calculate the center of the plot to position the camera/floor correctly
//   const centerX = design.plotWidth / 2;
//   const centerZ = design.plotLength / 2;

//   return (
//     <div className="h-full w-full bg-slate-900 rounded-[3rem] overflow-hidden relative">
//       <Canvas shadows>
//         <PerspectiveCamera makeDefault position={[centerX + 40, 40, centerZ + 40]} fov={40} />
//         <Suspense fallback={null}>
//           <Environment preset="city" />
//           <ambientLight intensity={0.4} />
//           <pointLight position={[20, 30, 20]} intensity={1} castShadow />

//           {/* --- THE PLOT FLOOR (FIXED) --- */}
//           {/* We position it at the center of the plot dimensions */}
//           <group position={[centerX, -0.01, centerZ]}>
//             <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
//               <planeGeometry args={[design.plotWidth, design.plotLength]} />
//               <meshStandardMaterial color="#1e293b" /> 
//             </mesh>
//             {/* Architectural Grid */}
//             <gridHelper 
//               args={[Math.max(design.plotWidth, design.plotLength) * 1.5, 20, "#334155", "#1e293b"]} 
//               position={[0, 0.01, 0]} 
//             />
//           </group>

//           {/* RENDER ROOMS */}
//           {design.rooms.map((room) => (
//             <Room3D 
//               key={room.id} 
//               room={room} 
//               doors={design.doors.filter(d => d.roomId === room.id)} 
//             />
//           ))}

//           <OrbitControls 
//             target={[centerX, 0, centerZ]} // Camera now rotates around the center of the plot
//             makeDefault 
//           />
//           <ContactShadows position={[centerX, 0, centerZ]} opacity={0.4} scale={100} blur={2} />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// };

// export default Scene3D;


import React from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { useDesign } from '../context/DesignContext';

const Door3D = ({ door, room }) => {
  const doorWidth = door.width || 3;
  const doorHeight = 7;
  let relX = 0, relZ = 0, rotationY = 0;

  if (door.side === 'top') { relX = (door.offset + doorWidth / 2) - (room.w / 2); relZ = -room.l / 2; }
  else if (door.side === 'bottom') { relX = (door.offset + doorWidth / 2) - (room.w / 2); relZ = room.l / 2; }
  else if (door.side === 'left') { relX = -room.w / 2; relZ = (door.offset + doorWidth / 2) - (room.l / 2); rotationY = Math.PI / 2; }
  else if (door.side === 'right') { relX = room.w / 2; relZ = (door.offset + doorWidth / 2) - (room.l / 2); rotationY = Math.PI / 2; }

  return (
    <group position={[relX, doorHeight / 2, relZ]} rotation={[0, rotationY, 0]}>
      <mesh>
        <boxGeometry args={[doorWidth, doorHeight, 0.15]} />
        <meshStandardMaterial color="#92400e" />
      </mesh>
    </group>
  );
};

const Room3D = ({ room, doors }) => {
  const wallHeight = 9;
  return (
    <group position={[room.x + room.w / 2, 0, room.y + room.l / 2]}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[room.w, room.l]} />
        <meshStandardMaterial color={room.color || "#ffffff"} />
      </mesh>
      {/* Wall Volume */}
      <mesh position={[0, wallHeight / 2, 0]}>
        <boxGeometry args={[room.w, wallHeight, room.l]} />
        <meshStandardMaterial color="#f1f5f9" transparent opacity={0.1} />
      </mesh>
      {/* Wall Lines */}
      <lineSegments position={[0, wallHeight / 2, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(room.w, wallHeight, room.l)]} />
        <lineBasicMaterial color="#6366f1" />
      </lineSegments>
      {doors.map(door => <Door3D key={door.id} door={door} room={room} />)}
    </group>
  );
};

export default function Scene3D() {
  const { design } = useDesign();
  const centerX = design.plotWidth / 2;
  const centerZ = design.plotLength / 2;

  return (
    <div className="h-full w-full bg-slate-900 overflow-hidden relative rounded-3xl">
      <Canvas shadows>
        {/* Set a solid background color instead of an HDR environment */}
        <color attach="background" args={['#0f172a']} />
        
        <PerspectiveCamera makeDefault position={[centerX + 40, 40, centerZ + 40]} fov={40} />
        
        {/* Offline-friendly Lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 20, 10]} intensity={1} castShadow />
        <pointLight position={[-10, 10, -10]} intensity={0.5} />
        
        <group position={[centerX, -0.01, centerZ]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[design.plotWidth, design.plotLength]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <gridHelper args={[100, 20, "#334155", "#1e293b"]} position={[0, 0.01, 0]} />
        </group>

        {design.rooms.map((room) => (
          <Room3D key={room.id} room={room} doors={design.doors.filter(d => d.roomId === room.id)} />
        ))}

        <OrbitControls target={[centerX, 0, centerZ]} makeDefault />
        <ContactShadows position={[centerX, 0, centerZ]} opacity={0.4} scale={100} blur={2} />
      </Canvas>
    </div>
  );
}