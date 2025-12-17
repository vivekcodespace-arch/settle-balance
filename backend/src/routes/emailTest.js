import express from "express";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

router.post("/test-email", async (req, res) => {
  const { to } = req.body;

  if (!to) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    await sendEmail({
      to,
      subject: "Resend Test Email",
      html: `
        <h2>Test Email</h2>
        <p>Your Resend email setup is working 🚀</p>
      `,
    });

    res.json({ message: "Test email sent successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to send email",
      error: err.message,
    });
  }
});

export default router;
