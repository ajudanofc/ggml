const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();

/* WAJIB */
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post("/send", async (req, res) => {
  const { to, subject, message } = req.body;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text: message
  });

  res.json({ ok: true });
});

/* WAJIB LISTEN DI PORT RAILWAY */
app.listen(PORT, () => {
  console.log("RUNNING ON PORT " + PORT);
});
