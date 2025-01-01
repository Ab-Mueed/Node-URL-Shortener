import User from "../models/user.js";
// import { v4 as uuidv4 } from "uuid";
import { setUser } from "../services/auth.js";

export const handleUserSignUp = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  return res.status(200).redirect("/");
};

export const handleSignUpRender = async (req, res) => {
  return res.status(200).render("signup");
};

export const handleLoginRender = async (req, res) => {
  return res.status(200).render("login");
};

export const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(401).render("login", {
      error: "Invalid credentials",
    });
  }
  // const sessionId = uuidv4();
  // setUser(sessionId, user);

  const token = setUser(user);
  res.cookie("uid", token);
  
  return res.status(200).redirect("/");
};

// The commented out code was earlier used for Stateful Authentication - Session Id
