import { Router } from "express";

const router = Router();

router.get("/ping", (req, res) => {
  res.json({
    telegram: true,
    status: "alive",
  });
});

export default router;