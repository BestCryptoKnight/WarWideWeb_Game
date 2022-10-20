import axios from "../utils/axios";

const getBalance = async (name) => {
    const result = await axios.get(`/api/balance/${name}`);
    return result.data.balance;
}

export {getBalance}