const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/* ========= SERVE HTML LANGSUNG ========= */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

/* ========= MAIL CONFIG ========= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // dari Render
    pass: process.env.EMAIL_PASS  // App Password
  }
});

/* ========= API SEND ========= */
app.post("/send", async (req, res) => {
  const { to, subject, message, count = 1, delay = 0 } = req.body;

  try {
    for (let i = 0; i < count; i++) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: message
      });

      if (delay) {
        await new Promise(r => setTimeout(r, delay * 1000));
      }
    }

    res.json({ ok: true });
  } catch (err) {
    res.json({ ok: false, error: err.message });
  }
});

/* ========= START ========= */
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
