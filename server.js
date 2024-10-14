const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const { connectDB } = require("./config/db");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());

connectDB();

app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
