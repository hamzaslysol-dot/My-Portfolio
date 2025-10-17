// import type { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// export const verifyAdmin = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return res.status(401).json({ error: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded: any = jwt.verify(token, JWT_SECRET);

//     if (decoded.role !== "admin") {
//       return res.status(403).json({ error: "Not authorized" });
//     }

//     // store user info in request for later use
//     (req as any).user = decoded;
//     next();
//   } catch (err) {
//     console.error("JWT verification failed:", err);
//     return res.status(403).json({ error: "Invalid token" });
//   }
// };
