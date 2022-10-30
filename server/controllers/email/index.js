const { EMAIL_API_KEY, EMAIL_SECRET_KEY } = require("../../constants");

const mailjet = require("node-mailjet").apiConnect(
  EMAIL_API_KEY,
  EMAIL_SECRET_KEY
);
const sendEmail = async (req, res) => {
  const content = req.body.message;
  const Subject = req.body.subject;
  const SenderName = req.body.name;
  const SenderEmail = req.body.email;
  const TargetEmail = req.body.targetEmail;
  
  try {

    const send = mailjet.post("send", { version: "v3.1" });
    const Recipients = TargetEmail;
    const result = await send.request({
      FromEmail: SenderEmail,
      FromName: SenderName,
      Subject: Subject,
      "Html-part": content,
      Recipients,
      
    });
    res.status(200);

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
