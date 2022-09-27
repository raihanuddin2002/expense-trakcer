import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPaginationData } from '../features/pagination/paginationSlice';

const SearchFilter = ({ searchData }) => {
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch()
    const { pageNo, type } = searchData;

    const handleForm = (e) => {
        e.preventDefault();

        dispatch(fetchPaginationData({ type, pageNo, searchText }))
    }
    return (
        <>
            <div>
                <form onSubmit={handleForm}>
                    <input
                        className="px-4 py-2 border"
                        type="text"
                        name="name"
                        placeholder="Search..."
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </form>
            </div>
        </>
    );
};

export default SearchFilter;