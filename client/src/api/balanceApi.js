import axios from "../utils/axios";
import { HEADER} from "../constants";

const getAvailability = async (name) => {
  const res = await axios.get(`/api/balance/getavailability?name=${name}`, HEADER);
  return res.data;
}

const payFee = async (name) => {
  const res = await axios.post('/api/balance/payGameFee', { name: name }, HEADER);
  return res.data;
}

export {
  getAvailability,
  payFee,
}
