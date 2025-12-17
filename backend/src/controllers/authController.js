import bcrypt from "bcrypt"
import { supabase } from "../config/supabaseClient.js";
import { generateToken } from "../utils/jwt.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required." });

  //check if the user previously exist with this email
  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (existingUser) {
    return res.status(400).json({ message: "Email already registered" })
  }


  //hash the passowrd
  const hashedPassoword = await bcrypt.hash(password, 10);


  const { data, error } = await supabase
    .from("users")
    .insert([{ name, email, password: hashedPassoword }])
    .select()
    .single();

  if (error) return res.status(400).json({ error });

  const token = generateToken(data);

  res.json({ user: data, token });
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required!" });


  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);

  if (!match)
    return res.status(401).json({ message: "Invalid Credentials" });

  const token = generateToken(user);

  res.json({ user, token });
}

export async function sendOtp(req, res) {
  const { name, email, password } = req.body;

  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (existingUser) {
    return res.status(400).json({ message: "Email already registered" })
  }

  //Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);


  const hashedPassword = await bcrypt.hash(password, 10);



  await supabase.from("pending_users").upsert({
    email,
    name,
    password: hashedPassword,
    otp,
    otp_expires: otpExpires,
  });


  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

  // TODO: send OTP via email (Nodemailer)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })


  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    html: `
    <h2>Your OTP Code</h2>
    <p>Use this OTP to continue: <b>${otp}</b></p>
    <p>This OTP will expire in 10 minutes.</p>
    `,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }

  console.log("OTP:", otp);
  return res.json({ message: "OTP sent to your email" });
}

export async function verifyOtp(req, res) {
  const { email, otp } = req.body;

  const { data: pending } = await supabase
    .from("pending_users")
    .select("*")
    .eq("email", email)
    .single();

  if (!pending) {
    return res.status(400).json({ message: "No pending Signup" })
  }
  if (pending.otp !== otp) {
    return res.status(400).json({ message: "Invalid otp" })
  }


  if (new Date().toISOString() > new Date(pending.otp_expires)) {
    return res.status(400).json({ message: "OTP expired" });
  }


  //Sign Up Logic

  const { data: newUser, error } = await supabase
    .from("users")
    .insert([{
      name: pending.name,
      email: pending.email,
      password: pending.password
    }])
    .select()
    .single();

  // Delete pending entry
  await supabase.from("pending_users").delete().eq("email", email);

  if (error) return res.status(400).json({ error });

  const token = generateToken(newUser)

  // Return real user
  return res.json({ user: newUser, message: "Account created" ,token});
}