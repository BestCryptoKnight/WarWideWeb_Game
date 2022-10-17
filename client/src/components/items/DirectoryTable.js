import React, { useState, useMemo } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { deleteSelectedItem } from '../../api/ImageApi';

// import SearchBox from "./SearchBox";

const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);

    const sortedItems = useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = "ascending";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "ascending"
        ) {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};

const DirectoryTable = (props) => {
    const { items, requestSort, sortConfig } = useSortableData(props.items);
    const { editItem, deleteItem } = props;
    //    const [searchValue, setSearchValue] = useState("");
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    // const searchHandler = (value) => {
    //     setSearchValue(value);
    // };

    let updateItems = items.filter((item) => {
        return Object.keys(item).some((key) =>
            item[key]
                .toString()
                .toLowerCase()
            //   .includes(searchValue.toString().toLowerCase())
        );
    });

    return (
        <>
            <div className="container">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <button
                                    type="button"
                                    onClick={() => requestSort("id")}
                                    className={getClassNamesFor("id")}
                                >
                                    ID
                                </button>
                            </th>
                            <th>
                                <button
                                    type="button"
                                    onClick={() => requestSort("description")}
                                    className={getClassNamesFor("description")}
                                >
                                    Description
                                </button>
                            </th>
                            <th>
                                <button
                                    type="button"
                                    onClick={() => requestSort("price")}
                                    className={getClassNamesFor("price")}
                                >
                                    Price
                                </button>
                            </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {updateItems.length > 0 ? (
                            updateItems.map((item) =>
                            (
                                <tr key={item._id}>
                                    <td>{item.id}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <IconButton
                                            aria-label="edit"
                                            onClick={() => {
                                                editItem(item);
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => { deleteSelectedItem(item._id); deleteItem(item._id) }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </td>
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
            </div>
        </>
    );
};

export default DirectoryTable;