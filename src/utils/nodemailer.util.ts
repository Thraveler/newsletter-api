import * as nodemailer from "nodemailer";
import "dotenv/config";

const createTransporter = (): nodemailer.Transporter => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  return transporter;
};

const options = (
  name: string,
  email: string,
  receivers: string | string[],
  subject: string,
  content: string
): nodemailer.SendMailOptions => {
  return {
    from: `${name} <${process.env.EMAIL}>`,
    to: receivers,
    subject: subject,
    text: content,
  };
};

const sendMail = (
  transporter: nodemailer.Transporter,
  options: nodemailer.SendMailOptions
) => {
  transporter.sendMail(options, (error, info) => {
    if (error) console.error(error);
    else console.log(info);
  });
};

export { createTransporter, options, sendMail };
