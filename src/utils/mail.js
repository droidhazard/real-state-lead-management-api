import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

let transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey",
    pass: process.env.SG,
  },
});

const sendMail = async function (subject, html) {
  transporter.sendMail(
    {
      from: process.env.SG_FROM,
      to: process.env.SG_FROM,
      subject: subject,
      html: html,
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email Sent: `, info.response);
      }
    }
  );
};

export { sendMail };
