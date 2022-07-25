const nodemailer = require("nodemailer");


const fromEmail= "rushikeshkharat5@gmail.com"
exports.sendEmail = ( 
  to = "rushikeshkharat5@gmail.com",
  subject = "Welcome to DEVSHOP App",
  text = "Thank you for registering with us"
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: fromEmail,
      pass: "rushi1234",
    },
  });
  transporter.sendMail(
    {
      from: fromEmail,
      to,
      subject,
      text
    },
    (err) => {
      err
        ? console.log(`Something went wrong ${err}`)
        : console.log("Email sent");
    }
  );
};
