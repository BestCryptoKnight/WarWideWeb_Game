import React, { useState, useEffect } from "react";
import DirectoryTable from "../components/items/DirectoryTable";
import AddItemForm from "../components/items/AddItermForm";
import EditItemForm from "../components/items/EditItemForm";
import Pagination from "../components/items/Pagination";
import Modal from "../components/items/Modal";
import useModal from "../hooks/useModal";
import axios from "../utils/axios";

const Admin = () => {
    const [items, setItems] = useState([]);
    const [editing, setEditing] = useState(false);
    const initialFormState = {
        _id: null,
        id: null,
        description: '',
        price: null,
    };
    const [currentItem, setCurrentItem] = useState(initialFormState);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const { isShowing, toggle } = useModal();

    useEffect(() => {
        axios("/image/")
            .then((response) =>
                response.data.map((item) => ({
                    _id: item._id,
                    id: item.id,
                    description: item.description,
                    price: item.price,
                }))
            )
            .then((data) => {
                setItems(data);
            });
    }, []);

    // incrementing ids + adding placeholder image manually
    // TODO: update id and image handling when tying this to a database
    const addItem = (item) => {
        toggle();
        setItems([item, ...items]);
    };

    const editItem = (item) => {
        setEditing(true);
        toggle();
        setCurrentItem({
            _id: item._id,
            id: item.id,
            description: item.description,
            price: item.price
        });
    };

    const updateItem = (_id, updatedItem) => {
        setEditing(false);
        setItems(items.map((item) => (item._id === _id ? updatedItem : item)));
        toggle();
    };

    const deleteItem = (_id) => {
        setItems(items.filter((item) => item._id !== _id));
    };

    // pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    // change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="container">
                <button className="button-add" onClick={toggle}>
                    Add Item
                </button>
            </div>
            {editing ? (
                <Modal
                    isShowing={isShowing}
                    hide={toggle}
                    content={
                        <EditItemForm
                            setEditing={setEditing}
                            currentItem={currentItem}
                            updateItem={updateItem}
                        />
                    }
                />
            ) : (
                <Modal
                    isShowing={isShowing}
                    hide={toggle}
                    content={<AddItemForm addItem={addItem} />}
                />
            )}
            <DirectoryTable
                items={currentItems}
                editItem={editItem}
                deleteItem={deleteItem}
            />
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={items.length}
                paginate={paginate}
            />
        </>
    );
};

export default Admin;