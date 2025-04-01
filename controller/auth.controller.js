import User from "../models/user.model.js";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import generateJWTTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const foundUser = await User.findOne({ username });

    if (foundUser) {
      res.status(202).json({ message: "User already exists" });
    } else {
      const user = new User({ username: username, password: hashedPassword });
      const token = generateJWTTokenAndSetCookie(user._id, res);
      await user.save();
      res.status(201).json({ message: "User created successfully!!" , token: token});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "User reg failed!" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    // console.log(user);
    if (!user) return res.status(401).json({ error: "Auth failed" });
    const passwordMatch = await bcrypt.compare(password, user?.password || "");
    if (!passwordMatch) return res.status(401).json({ error: "Auth failed" });
    const token = generateJWTTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      token: token
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Login failed" });
  }
};
