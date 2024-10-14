const express = require("express");
const { register, login } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Это защищённый маршрут", user: req.user });
});

module.exports = router;
