import axios from "../utils/axios";
import { HEADER } from "../constants";

const changePassword = async (formData) => {
    try {
        await axios.post('api/account/changePassword', formData, HEADER());
    } catch (error) {
        return (error)
    }
}

const changeAccount = async (formData) => {
    try {
        await axios.post('api/account/changeAccount', formData, HEADER());
    } catch (error) {
        return (error);
    }
}

export {
    changeAccount,
    changePassword,
}