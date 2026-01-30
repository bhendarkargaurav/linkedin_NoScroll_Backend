import User from "../models/user.model.js";

// email regex (simple & effective)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const checkAndCreateUser = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. check email exists in request
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // 2. check email valid or not
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // 3. check email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "You already have an account",
      });
    }

    // 4. create new user
    const newUser = await User.create({ email });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
