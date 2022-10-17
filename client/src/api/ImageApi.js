import axios from '../utils/axios';

export const addItem = async (item) => {
    console.log('here: ', item);
    const data = {
        id: item.id,
        description: item.description,
        price: item.price,
    }
    const result = await axios.post('/image', data);
    console.log(result);
}

export const updateItem = async (item) => {
    const data = {
        id: item.id,
        description: item.description,
        price: item.price,
    }
    console.log('item: ', item);
    const result = await axios.patch(`/image/${item._id}`, data);
    console.log(result);
}

export const deleteSelectedItem = async (_id) => {
    const result = await axios.delete(`/image/${_id}`);
    console.log(result);
}