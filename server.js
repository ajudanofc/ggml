const express = require("express");
const { Resend } = require("resend");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

/* ===== RESEND (NO SMTP, PASTI TEMBUS) ===== */
const resend = new Resend(process.env.RESEND_KEY);

app.post("/send", async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    await resend.emails.send({
      from: "Anonimous Mail <onboarding@resend.dev>",
      to,
      subject,
      text: message
    });

    res.json({ ok: true });
  } catch (err) {
    res.json({ ok: false, error: err.message });
  }
});

app.listen(PORT, () => console.log("RUNNING ON PORT " + PORT));
