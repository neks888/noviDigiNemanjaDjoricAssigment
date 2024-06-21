import { Request, Response } from "express";
import mongoose from "mongoose";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

const { ObjectId } = mongoose.Types;

const secret = "mySecret"; // Use environment variable in production

// export const registerUser = async (req: Request, res: Response) => {
//   res.json({ message: "Hello from the register user" });
// };
export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.json({ message: "Invalid email format" });
  }

  if (password.length < 6) {
    return res.json({ message: "Password must be at least 6 characters long" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.json({ message: "User already exists" });
    // return res.json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser: IUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: "1h" });
  return (
    res
      .status(201)
      // .json({ token, user: { id: newUser._id, firstName, lastName, email } });
      .json({ token, id: newUser._id })
  );
};

// export const getUser = async (req, res) => {
//   res.json({ message: "Hello from the getUser" });
// };

export const getUser = async (req: Request, res: Response) => {
  // res.json({ message: "Hello from the getUser" });
  try {
    const user = await User.find({ _id: ObjectId(req.params.id) }).select(
      "-password"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
