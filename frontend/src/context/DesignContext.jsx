import React, { createContext, useState, useContext } from 'react';

const DesignContext = createContext();

export const DesignProvider = ({ children }) => {
  
  // inside your useState in DesignProvider
const [design, setDesign] = useState({
  // Master Plot Dimensions
  plotWidth: 50, 
  plotLength: 40,
  setbackFront: 5, setbackBack: 3, setbackLeft: 3, setbackRight: 3,
  
  // Custom Independent Rooms
  rooms: [
    { id: 1, name: "Hall", w: 20, l: 15, x: 5, y: 5, color: "#f8fafc", z: 1 },
    { id: 2, name: "Bed 1", w: 12, l: 12, x: 26, y: 5, color: "#f0f9ff", z: 2 }
  ]
  ,
  doors: [
    { id: 'd1', roomId: 1, side: 'bottom', offset: 5, width: 3, isOpen: true }
  ]
});

// Helper to update plot-level settings
const updatePlot = (field, value) => {
  setDesign(prev => ({ ...prev, [field]: Number(value) }));
};

const addDoor = (roomId) => {
    const newDoor = {
      id: "door-" + Date.now(),
      roomId: roomId,
      side: 'bottom',
      offset: 2,
      width: 3,
      isOpen: true
    };
    setDesign(prev => ({ ...prev, doors: [...prev.doors, newDoor] }));
  };

  const updateDoor = (id, field, value) => {
    setDesign(prev => ({
      ...prev,
      doors: prev.doors.map(d => d.id === id ? { ...d, [field]: value } : d)
    }));
  };

  const removeDoor = (id) => {
    setDesign(prev => ({ ...prev, doors: prev.doors.filter(d => d.id !== id) }));
  };

// Update Room Position (Drag & Drop)
const moveRoom = (id, x, y) => {
  setDesign(prev => ({
    ...prev,
    rooms: prev.rooms.map(r => r.id === id ? { ...r, x, y } : r)
  }));
};

// Helper to add a new blank room
const addRoom = () => {
  const newRoom = {
    id: Date.now(),
    name: "New Room",
    w: 10,
    l: 10,
    // Spawn at the start of the legal buildable area
    x: design.setbackLeft, 
    y: design.setbackFront,
    color: "#ffffff",
    z: design.rooms.length + 1 // Always put new rooms on top
  };
  setDesign(prev => ({ ...prev, rooms: [...prev.rooms, newRoom] }));
};

// Helper to update a specific room's property
const updateRoom = (id, field, value) => {
  setDesign(prev => ({
    ...prev,
    rooms: prev.rooms.map(r => r.id === id ? { ...r, [field]: value } : r)
  }));
};

// Helper to delete a room
const removeRoom = (id) => {
  setDesign(prev => ({ ...prev, rooms: prev.rooms.filter(r => r.id !== id) }));
};

  const updateDesign = (name, value) => {
    setDesign(prev => ({ ...prev, [name]: value }));
  };

  // Add this helper to your DesignContext.jsx
const resizeRoom = (id, newW, newL) => {
  setDesign(prev => ({
    ...prev,
    rooms: prev.rooms.map(r => 
      r.id === id ? { ...r, w: Math.max(1, newW), l: Math.max(1, newL) } : r
    )
  }));
};

const [selectedId, setSelectedId] = useState(null);

const [view, setView] = useState('2d'); // '2d' or '3d'

  return (
    <DesignContext.Provider value={{ design, updateDesign, addRoom,updateRoom,removeRoom,moveRoom,updatePlot,resizeRoom,selectedId,setSelectedId ,addDoor,updateDoor,removeDoor,view,setView}}>
      {children}
    </DesignContext.Provider>
  );
};

export const useDesign = () => useContext(DesignContext);