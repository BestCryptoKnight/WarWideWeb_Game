import axios from "../utils/axios";

const sendEmail = async (
  SenderName,
  SenderEmail,
  phone,
  text
) => {
    console.log(phone)
  try {
    const data = await axios.post("https://formcarry.com/s/fUFAR4C7h", {
      name: SenderName,
      email: SenderEmail,
    //   phone: phone,
      message: text
    //   TargetEmail: TargetEmail,
    });
  } catch (error) {
    return 1000;
  }
};

export { sendEmail };
