import React, { useState } from 'react';
import { addItem } from '../../api/ImageApi';

const AddItemForm = (props) => {
    const initialFormState = {
        _id: '',
        id: '',
        description: '',
        price: '',
    };
    const [item, setItem] = useState(initialFormState);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setItem({ ...item, [name]: value });
    };

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                if (!item.price || !item.id || !item.description) return;
                props.addItem(item);
                setItem(initialFormState);
                addItem(item);
            }}>
            <h2>Add Item</h2>
            <div className='form-group'>
                <label>ID</label>
                <input
                    type='number'
                    name='id'
                    value={item.id}
                    onChange={handleInputChange}
                    required />
            </div>
            <div className='form-group'>
                <label>Description</label>
                <input
                    type='text'
                    name='description'
                    value={item.description}
                    onChange={handleInputChange}
                    required />
            </div>
            <div className='form-group'>
                <label>Price</label>
                <input
                    type='number'
                    name='price'
                    value={item.price}
                    onChange={handleInputChange}
                    required />
            </div>
            <button className='modal-button'>Add Item</button>
        </form>
    );
};

export default AddItemForm;