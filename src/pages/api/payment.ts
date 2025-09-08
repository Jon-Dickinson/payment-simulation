import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Extract some dummy fields from the request if you want
    const { amount = 100, currency = "USD" } = req.body || {};

    // Simulate random success/failure
    const success = Math.random() > 0.2; // 80% success rate

    setTimeout(() => {
      if (success) {
        res.status(200).json({
          success: true,
          transactionId: `txn_${Math.floor(Math.random() * 100000)}`,
          amount,
          currency,
          message: "Payment processed successfully!",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Payment failed due to insufficient funds",
        });
      }
    }, 2000); // simulate processing delay
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
