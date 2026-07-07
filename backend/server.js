import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import telegramRouter from "./routes/telegram.js"
import entriesRouter from "./routes/entries.js"

//────────────────────────────
// ENV
//────────────────────────────

dotenv.config()

//────────────────────────────
// APP INIT
//────────────────────────────

const app = express()

app.use(cors())
app.use(express.json())

//────────────────────────────
// ROUTES
//────────────────────────────

app.use("/telegram", telegramRouter)
app.use("/entries", entriesRouter)

//────────────────────────────
// HEALTH CHECK
//────────────────────────────

app.get("/", (_, res) => {
  res.send("Thrive Backend Running")
})

//────────────────────────────
// START SERVER
//────────────────────────────

app.listen(process.env.PORT || 3001, () => {
  console.log("Backend started")
})