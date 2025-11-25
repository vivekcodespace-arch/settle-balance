import bcrypt from "bcrypt"
import { supabase } from "../config/supabaseClient.js";
import { generateToken } from "../utils/jwt.js";

export async function signup(req, res) {
  const { name, email, password } = req.body;

  if(!name || !email || !password)
    return res.status(400).json({message : "All fields are required."});

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

  if(!email || !password)
    return res.status(400).json({message:"Email and password are required!"});


  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) return res.status(400).json({ message: "User not found" });

  const match =  await bcrypt.compare(password,user.password);
  
  if(!match)
    return res.status(401).json({message: "Invalid Credentials"});

  const token = generateToken(user);

  res.json({ user, token });
}
