import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../features/transaction/transactionSlice";
import numberWithCommas from "../utils/numberWithCommas";

export default function Balance() {
    const dispatch = useDispatch();
    const { transactions } = useSelector((state) => state.transaction);

    const calculateIncome = (transactions) => {
        let income = 0;
        transactions.forEach((transaction) => {
            const { type, amount } = transaction;
            if (type === "income") {
                income += Number(amount);
            } else {
                income -= Number(amount);
            }
        });

        return income;
    };

    // Load All transections for Calculation
    useEffect(() => {
        dispatch(fetchTransactions(''))
    }, [dispatch])

    return (
        <div className="top_card">
            <p>Your Current Balance</p>
            <h3>
                <span>৳</span>{" "}
                {transactions?.length && (
                    <span>
                        {numberWithCommas(calculateIncome(transactions))}
                    </span>
                )}
            </h3>
        </div>
    );
}
