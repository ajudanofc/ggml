const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_KEY);

app.post("/send", async (req, res) => {
  const { to, subject, message } = req.body;

  await resend.emails.send({
    from: 'YourName <onboarding@resend.dev>',
    to,
    subject,
    text: message
  });

  res.json({ ok: true });
});
