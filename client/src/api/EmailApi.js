import axios from "../utils/axios";

const sendEmail = async (
  senderName,
  senderEmail,
  text,
  targetEmail
) => {
  try {
    const data = await axios.post("api/email/send", {
      name: senderName,
      email: senderEmail,
      message: text,
      targetEmail: targetEmail,
      subject : senderName + " sent you an email."
    });
    return data;
  } catch (error) {
    return 500;
  }
};

export { sendEmail };
