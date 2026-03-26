import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/**
 * Protects routes by verifying the JWT in the Authorization header.
 * Attaches the found user (with neon settings) to the request object.
 */
export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("auth header ",authHeader);

    // 1. Check for Header Presence
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "ACCESS_DENIED: NO_TOKEN_DETECTED",
      });
    }

    const token = authHeader.split(" ")[1];

    // 2. Verify Token
    // jwt.verify throws an error if expired or tampered with
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: "ACCESS_DENIED: MALFORMED_TOKEN",
      });
    }

    // 3. Fetch User and populate their Neon Theme settings
    // We explicitly exclude password but include the profile and settings
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "USER_SYNC_ERROR: IDENTIFIER_NOT_FOUND",
      });
    }

    // 4. Attach user to request for use in controllers
    req.user = user;
    
    // Log for debugging in development (Neon style)
    console.log(`📡 AUTH_SUCCESS: User [${user.username}] is authorized.`);
    
    next();

  } catch (error) {
    console.error("🔒 AUTH_MIDDLEWARE_CRITICAL:", error.message);

    // Handle specific JWT errors for clearer frontend feedback
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "SESSION_EXPIRED: PLEASE_RE_AUTHENTICATE" });
    }

    return res.status(401).json({
      success: false,
      message: "UNAUTHORIZED: INVALID_SECURITY_CREDENTIALS",
    });
  }
};