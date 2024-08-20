import nodemailer from "nodemailer";

// Create a transporter object using your email service
const transporter = nodemailer.createTransport({
  service: "Gmail", // or another email service provider
  auth: {
    user: "oklathon@gmail.com", // Your email address
    pass: "hwva eqtp wwaw jpej", // Your email password or app password
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: '"Maintenance Tracker" <oklathon@gmail.com>',
      to, // Receiver address
      subject, // Subject line
      text, // Plain text body
    });
    console.log("Email sent: %s", info.messageId);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: error.message };
  }
};

module.exports = sendEmail;
