import axios from "../utils/axios";
import { HEADER } from "../constants";

const joinRoom = async (amount) => {
  const res = await axios.post('/api/game/joinRoom', {amount: amount}, HEADER);
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
