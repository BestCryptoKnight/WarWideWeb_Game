import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { sendEther, withdraw } from "../utils/wallet";

const Admin = () => {
    const limit = 10;
    const [items, setItems] = useState([]);
    const [page, setPage] = React.useState(1);

    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        axios.get(`/api/image/?page=${page}&limit=${limit}`)
            .then((response) =>
                response.data.map((item) => ({
                    id: item.ID,
                    description: item.Description,
                    price: item.Price,
                }))
            )
            .then((data) => {
                setItems(data);
            });
    }, [page]);

    return (
        <>
            <div className="container">
                <h1>Image Information</h1>
                <table>
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                Description
                            </th>
                            <th>
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? (
                            items.map((item) =>
                            (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                </tr>
                            )
                            )
                        ) : (
                            <tr>
                                <td colSpan={5}>No Items</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Stack spacing={2}>
                    <Pagination count={100} page={page} color="primary" onChange={handleChange} />
                </Stack>
            </div>
        </>
    );
};

export default Admin;