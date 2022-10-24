import axios from "../utils/axios";
import { HEADER} from "../constants";

const getAvailability = async (name) => {
  console.log('sending name: ', name);
  const res = await axios.get(`/api/balance/getavailability?name=${name}`, HEADER);
  console.log('res: ', res.data);
  return res.data;
}

const payFee = async (name) => {
  console.log('I am paying FEE: ', name);
  const res = await axios.post('/api/balance/payGameFee', { name: name }, HEADER);
  console.log('After pay: ', res.data);
  return res.data;
}

export {
  getAvailability,
  payFee,
}
