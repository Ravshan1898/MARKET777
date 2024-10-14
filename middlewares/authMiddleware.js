const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Нет токена, авторизация отклонена" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Токен недействителен" });
  }
};

module.exports = authMiddleware;
