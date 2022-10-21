import axios from "../utils/axios";
import { HEADER } from "../constants";

const joinRoom = async (amount) => {
  console.log('header:', HEADER);
  const res = await axios.post('/api/game/joinRoom', {amount: amount}, HEADER);
  console.log('res: ', res);
  return res.data;
}

const loadData = async () => {
  const res = await axios.get('/api/game', HEADER);
  return res;
}

export {
  joinRoom,
  loadData
}
