import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  // RELATIONSHIP: Link to the User
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  
  // BASIC PROJECT INFO
  name: { 
    type: String, 
    default: "NEW_ARCHITECTURE_VOID",
    trim: true 
  },
  status: { 
    type: String, 
    enum: ['draft', 'published', 'archived'], 
    default: 'draft' 
  },

  // THE PAYLOAD: This mirrors your React DesignContext state
  designData: {
    plotWidth: { type: Number, default: 60 },
    plotLength: { type: Number, default: 60 },
    
    // Nested Array for Rooms (The 2D/3D Source)
    rooms: [{
      id: { type: String, required: true },
      name: { type: String, default: "Living Area" },
      w: { type: Number, default: 12 },
      l: { type: Number, default: 12 },
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 },
      color: { type: String, default: "#00f2ff" } // Neon Cyan
    }],

    // Nested Array for Doors
    doors: [{
      id: { type: String, required: true },
      roomId: { type: String, required: true },
      side: { type: String, enum: ['top', 'bottom', 'left', 'right'] },
      offset: { type: Number, default: 2 },
      width: { type: Number, default: 3 }
    }]
  },

  // EXTRA_DETAILS: For non-architectural metadata
  extraDetails: {
    address: { type: String, default: "" },
    tags: [String], // e.g., ['Modern', '2-Story', 'Neon-Style']
    clientName: { type: String, default: "Self" },
    notes: { type: String, default: "" }
  },

  // VERSION_HISTORY: Overleaf-style tracking
  history: [{
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    changeLog: String, // e.g., "Added Master Bedroom"
    timestamp: { type: Date, default: Date.now }
  }],

  // PREVIEW: For the Neon Dashboard Cards
  thumbnail: { type: String }, // Base64 string of the canvas export
  isFavorite: { type: Boolean, default: false }

}, { 
  timestamps: true 
});

// Indexing for high-speed dashboard loading
projectSchema.index({ owner: 1, updatedAt: -1 });

const Project = mongoose.model('Project', projectSchema);
export default Project;