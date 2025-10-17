import { Router } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

export const authRouter = Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Replace with your own secret
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

authRouter.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) throw new Error("Invalid Google token");

    const { email, name, picture } = payload;

    // Generate your own session JWT
    const customToken = jwt.sign(
      { email, name, picture, role: "admin" },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token: customToken });
  } catch (err) {
    console.error("Google auth error:", err);
    res.status(401).json({ error: "Invalid Google token" });
  }
});
