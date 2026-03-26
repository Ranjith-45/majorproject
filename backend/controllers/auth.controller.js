import User from '../models/user.model.js';
import verifyGoogleTokenAndCreateUser from "../services/auth.service.js";

/**
 * GOOGLE AUTHENTICATION
 * Handles the token from the frontend and initializes the Architect session.
 */
export const googleAuth = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, message: "MISSING_IDENTITY_TOKEN" });
  }

  try {
    // 1. Verify and Sync with Database via Service
    const authResult = await verifyGoogleTokenAndCreateUser(token);

    if (!authResult) {
      return res.status(401).json({ success: false, message: "GOOGLE_VERIFICATION_FAILED" });
    }

    const { user, jwtToken } = authResult;

    // 2. Filter sensitive data (password excluded via service/model logic)
    // We send back the profile and settings so the UI can adapt immediately
    res.status(200).json({
      success: true,
      message: "ARCHITECT_SESSION_INITIALIZED",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        profile: user.profile,
        settings: user.settings, // Contains neon theme preference
      },
      token: jwtToken,
    });

  } catch (error) {
    console.error("❌ AUTH_CONTROLLER_ERROR:", error.message);
    res.status(500).json({ success: false, message: "INTERNAL_SERVER_ERROR" });
  }
};

/**
 * SESSION CHECK (Persistent Login)
 * Used by the frontend on mount to check if the current token is still valid.
 */
export const checkAuth = async (req, res) => {
  try {
    // req.user is attached by the protectRoute middleware
    res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    console.error("❌ CHECK_AUTH_ERROR:", error.message);
    res.status(500).json({ success: false, message: "SESSION_RECOVERY_FAILED" });
  }
};