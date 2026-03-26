import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    trim: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
    default: "ARCH_USER_01" 
  },

  // NEW: Profile Object for Personal Details
  profile: {
    fullName: { type: String, default: "" },
    avatar: { type: String, default: "" }, // Base64 or URL
    bio: { type: String, maxLength: 200 },
    socialLinks: [{
      platform: String,
      url: String
    }]
  },

  // NEW: Settings Object (Crucial for your Neon Theme)
  settings: {
    theme: { type: String, default: "neon-blue" }, // 'neon-blue', 'dark', 'matrix'
    notifications: { type: Boolean, default: true },
    unitSystem: { type: String, enum: ['imperial', 'metric'], default: 'imperial' }
  },

  // NEW: Tracking activity for the Dashboard
  activityLog: [{
    action: String, // e.g., "Created Project", "Deleted Room"
    timestamp: { type: Date, default: Date.now }
  }],

  lastLogin: { 
    type: Date, 
    default: Date.now 
  }
}, { 
  timestamps: true 
});

const User = mongoose.model('User', userSchema);
export default User;