import nodemailer from "nodemailer";

 const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.USER_NAME,
        pass: process.env.PASSWORD,
      },
    });
    await transporter.sendMail({
      from: process.env.USER_NAME,
      to: email,
      subject: subject,
      html: text,
    });

  } catch (error) {
    console.log(error);
  }
};

export default sendEmail