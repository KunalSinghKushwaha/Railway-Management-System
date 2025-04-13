import { hash, compare } from "bcryptjs";
import pkg from "jsonwebtoken";
const {sign} = pkg;
import dotenv from "dotenv";
import { findOne } from "../models/user.js";
import User from "../models/user.js";
dotenv.config();


export async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    
    let user = await findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    
    const hashedPassword = await hash(password, 10);

    
     user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}


export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    
    const user = await findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    
    const token = sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}



export async function getProfile(req, res) {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: ['id', 'username', 'email'],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error in getProfile:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}


