import axios from "../utils/axios";

const getAvailability = async (name) => {
  console.log('name: ', name);
  const res = await axios.post('/api/balance/getavailability', {name: name});
  console.log('res: ', res);
  return res.data;
}


export {
  getAvailability,
}
