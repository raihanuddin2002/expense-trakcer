import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchPaginationData } from '../../features/pagination/paginationSlice';
import Transaction from './Transaction';

const LimitedTrasactions = () => {
    const dispatch = useDispatch();
    const { newItem, editCount } = useSelector(state => state.transaction);
    const { limitedData } = useSelector(state => state.pagination);

    useEffect(() => {
        dispatch(fetchPaginationData({ pageNo: 1 }))
    }, [dispatch, newItem, editCount])

    return (
        <>
            <p className="second_heading">Recent Transactions:</p>
            <div>
                {
                    limitedData.map(data => <Transaction key={data.id} transaction={data} />)
                }
            </div>
            <div style={{ marginLeft: "auto" }}>
                <Link to='/transactions'>
                    <button className="btn">
                        See All
                    </button>
                </Link>
            </div>
        </>
    );
};

export default LimitedTrasactions;