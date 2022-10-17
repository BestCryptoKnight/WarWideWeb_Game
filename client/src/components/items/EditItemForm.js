import React, { useState, useEffect } from "react";
import { updateItem } from "../../api/ImageApi";

const EditItemForm = (props) => {
    const [item, setItem] = useState(props.currentItem);

    useEffect(() => {
        setItem(props.currentItem);
    }, [props]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setItem({ ...item, [name]: value });
    };

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                props.updateItem(item._id, item);
                updateItem(item);
            }}
        >
            <div className='form-group'>
                <h2>Edit Item</h2>
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
            <button className="modal-button">Update Item</button>
        </form>
    );
};

export default EditItemForm;