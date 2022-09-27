import React from 'react';
import { useDispatch } from 'react-redux';
import { selectedPage } from '../features/pagination/paginationSlice';

const Pagination = ({ data }) => {
    const { pageNo, index } = data;
    const dispatch = useDispatch();

    // Handle Selected Page
    const handleSelect = () => dispatch(selectedPage(index + 1))

    return (
        <>
            <div
                className={`${pageNo === index + 1 ? "bg-red-500" : "bg-blue-800"} text-white px-4 py-1 rounded`}
                onClick={handleSelect}
            >
                {index + 1}
            </div>
        </>
    );
};

export default Pagination;