import * as nodemailer from "nodemailer";
import "dotenv/config";
import path from "path"

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
  receivers: string | string[],
  subject: string,
  content: string,
  file: string
): nodemailer.SendMailOptions => {
  return {
    from: `${name} <${process.env.EMAIL}>`,
    to: receivers,
    subject: subject,
    html: content,
    attachments: [{
      filename: file,
      path: path.join(__dirname, '../../uploads', file)
    }]
  };
};

const sendMail = (
  transporter: nodemailer.Transporter,
  options: nodemailer.SendMailOptions
) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(options, (error, info) => {
      if (error) {
        console.error(error);
        reject(error);
      }
      else {
        console.log("Email sent!");
        resolve(info)
      }
    });
  })
};

export { createTransporter, options, sendMail };
