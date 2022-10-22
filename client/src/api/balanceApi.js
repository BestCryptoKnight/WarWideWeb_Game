import axios from "../utils/axios";

const getAvailability = async (username) => {
  const res = await axios.post('/api/balance/getavailability', {username: username});
  console.log('res: ', res);
  return res.data;
}


export {
  getAvailability,
}
