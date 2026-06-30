import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/auth.js";
import telegramRouter from "./routes/telegram.js";
import paymentsRouter from "./routes/payments.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    server: "Thrive Backend",
    version: "0.1",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/telegram", telegramRouter);
app.use("/api/payments", paymentsRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Thrive Backend running on http://localhost:${PORT}`);
});