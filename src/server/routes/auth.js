import { Router } from "express";

const router = Router();

router.post("/telegram", async (req, res) => {
  return res.json({
    success: true,
    message: "Telegram auth endpoint is working.",
  });
});

router.get("/status", (req, res) => {
  res.json({
    auth: "ok",
  });
});

export default router;