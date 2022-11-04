const { Sender } = require("node-mailjet");
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

    const request = mailjet
      .post("send", { 'version': 'v3.1' })
      .request({
        "Messages": [
          {
            "From": {
              "Email": "c.m.brilliant34310@gmail.com",
              "Name": SenderName
            },
            "To": [
              {
                "Email": "warwideweb@gmail.com",
                "Name": "War Boss"
              }
            ],
            "Subject": SenderName + " (" + SenderEmail + ") sent you a message",
            "TextPart": content, 
            // "HTMLPart": "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!"
          }
        ]
      })

    console.log(request);
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
