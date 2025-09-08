import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const token = `auth-token-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`;
    setTimeout(() => {
      res.status(200).json({
        success: true,
        token,
        message: "User authenticated successfully",
      });
    }, 1500);
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
