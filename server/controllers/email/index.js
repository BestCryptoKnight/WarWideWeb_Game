const { EMAIL_API_KEY, EMAIL_SECRET_KEY } = require("../../constants");

// const mailjet = require('node-mailjet').connect(
//     EMAIL_API_KEY,
//     EMAIL_SECRET_KEY
// );

const mailjet = require("node-mailjet").apiConnect(
  EMAIL_API_KEY,
  EMAIL_SECRET_KEY
);
const sendEmail = async (req, res) => {
  const content = req.body.content;
  const Subject = req.body.Subject;
  const SenderName = req.body.SenderName;
  const SenderEmail = req.body.sendEmail;
  const TargetEmail = req.body.TargetEmail;
  
  try {
    const send = mailjet.post("send", { version: "v3.1" });
    const Recipients = TargetEmail;
    send.request({
      FromEmail: SenderEmail,
      FromName: SenderName,
      Subject: Subject,
      "Html-part": content,
      Recipients,
      
    });
    // res.json("succes");

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

module.exports = {
  sendEmail,
};
