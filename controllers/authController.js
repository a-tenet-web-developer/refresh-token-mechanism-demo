const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const jwtUtils = require("../utils/jwtUtils");

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error registering user", error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = jwtUtils.generateAccessToken(user._id);
    const refreshToken = jwtUtils.generateRefreshToken(user._id);

    await new Token({ userId: user._id, refreshToken }).save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({ accessToken,refreshToken });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken)
    return res.status(403).json({ message: "No token provided" });

  const payload = jwtUtils.verifyToken(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  if (!payload) return res.status(403).json({ message: "Invalid token" });

  try {
    const token = await Token.findOne({ refreshToken });
    if (!token) return res.status(403).json({ message: "Token not found" });

    const accessToken = jwtUtils.generateAccessToken(payload.id);
    res.status(200).json({ accessToken });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error refreshing token", error: err.message });
  }
};

const logout = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken)
    return res.status(400).json({ message: "No token provided" });

  try {
    await Token.findOneAndDelete({ refreshToken });
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error logging out", error: err.message });
  }
};

module.exports = { register, login, refreshToken, logout };
