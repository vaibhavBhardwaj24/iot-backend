import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bhardwajvaibhav2412@gmail.com",
    pass: process.env.GMAIL_PASS,
  },
});
export const sendMail = async ({ email }) => {
  const info = await transporter.sendMail({
    to: email,
    subject: "ALERT!",
    text: "Turn off your AC",
    html: `
    <div style="font-family: Arial, sans-serif; text-align: center;">
      <h1 style="color: #3498db;">ALERT!</h1>
      <p>teri maa ki chut randi</p>
      <p>visit your dashboard for more info.</p>
    </div>
  `,
  });
  return info;
};
