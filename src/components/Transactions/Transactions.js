import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/transaction/transactionSlice";
import Transaction from "./Transaction";
import { fetchPaginationData } from "../../features/pagination/paginationSlice";
import Pagination from "../Pagination";


export default function Transactions() {
    const [type, setType] = useState("");
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();
    const { transactions, isLoading, isError } = useSelector((state) => state.transaction);
    const { limitedData, pageNo } = useSelector((state) => state.pagination);

    useEffect(() => {
        dispatch(fetchPaginationData({ type, pageNo }))
    }, [dispatch, pageNo, type]);

    useEffect(() => {
        dispatch(fetchTransactions(type));
    }, [dispatch, type]);

    // decide what to render
    let content = null;
    if (isLoading) content = <p>Loading...</p>;

    if (!isLoading && isError)
        content = <p className="error" > There was an error occured </p>;

    if (!isLoading && !isError && limitedData?.length > 0) {
        content = limitedData.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
        ));
    }

    if (!isLoading && !isError && limitedData?.length === 0) {
        content = <p>No transactions found! </p>;
    }

    // Handle Search Form
    const handleForm = (e) => {
        e.preventDefault();

        dispatch(fetchPaginationData({ type, pageNo, searchText }))
    }

    return (
        <>
            <div className="mb-8">
                <Link to='/' >
                    <span className="text-blue-600" > Back Home </span>
                </Link>
            </div>

            {/* <SearchFilter searchData={{ pageNo, type }} /> */}
            {/* Search Filter */}
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

            {/* Radio Filter */}

            <div className="form-group radio flex justify-center">
                <span
                    className={`mr-4 pointer-cursor text-2xl text-center  ${type === 'income' && 'text-blue-900 font-bold'}`}
                    onClick={() => {
                        setType("income")
                        setTimeout(() => dispatch(fetchPaginationData({ type: "income", pageNo, searchText })), 200)
                    }}
                >
                    Income
                </span>

                <span
                    className={`mr-4 pointer-cursor text-2xl text-center text-2xl text-center pointer-cursor ${type === 'expense' && 'text-red-900 font-bold'}`}
                    onClick={() => {
                        setType("expense")
                        setTimeout(() => dispatch(fetchPaginationData({ type: "expense", pageNo, searchText })), 200)
                    }}
                >
                    Expense
                </span>

                <button
                    className="bg-none px-4 text-yellow-800 rounded text-2xl font-bold"
                    onClick={() => setType("")}
                >
                    Reset
                </button>
            </div>

            <p className="second_heading" > Your Transactions: </p>

            <div className="conatiner_of_list_of_transactions" >
                <ul>{content} </ul>
            </div>

            {/* <!-- pagination--> */}
            <section className="pt-12" >
                <div
                    className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 justify-end"
                >
                    {
                        [...Array(Math.ceil(transactions.length / 5))].map((_, index) => <Pagination key={index} data={{ pageNo, index }} />)}
                </div>
            </section>
        </>
    );
}
