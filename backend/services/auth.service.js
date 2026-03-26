import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs"; // For generating secure random password
import User from "../models/user.model.js";

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleTokenAndCreateUser = async (token) => {
  try {
    // 1. Verify Google token
    // FIX: Using 'idToken' (camelCase) is the required key for this library
    const ticket = await client.verifyIdToken({
      idToken: token, 
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      console.error("❌ AUTH_FAIL: No payload returned from Google");
      return null;
    }

    const { name, email, picture, sub: googleId } = payload;

    // 2. Check if user already exists
    let user = await User.findOne({ email });

    // 3. Create user if not exists (Matching your User Model)
    if (!user) {
      // Create a secure random password for OAuth users
      const randomPassword = Math.random().toString(36).slice(-10);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = new User({
        email,
        password: hashedPassword, // Required by your model
        username: name.split(' ')[0] + Math.floor(Math.random() * 1000), // Unique-ish username
        profile: {
          fullName: name,
          avatar: picture,
          bio: "Architect synced via Google"
        },
        settings: {
          theme: "neon-blue" // Defaulting to your Neon theme
        },
        lastLogin: new Date()
      });

      await user.save();
    } else {
      // If user exists, update their last login
      user.lastLogin = new Date();
      await user.save();
    }

    // 4. JWT Payload (Keep it lean)
    const jwtPayload = {
      id: user._id,
      email: user.email,
      username: user.username,
      theme: user.settings.theme // Send theme to frontend immediately
    };

    // 5. Generate JWT
    const jwtToken = jwt.sign(
      jwtPayload,
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return { user, jwtToken };
  } catch (error) {
    console.error("CRITICAL_AUTH_ERROR:", error.message);
    return null;
  }
};

export default verifyGoogleTokenAndCreateUser;