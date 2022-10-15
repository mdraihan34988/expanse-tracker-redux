import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpense } from "../features/expense/expenseSlice";
import numberWithCommas from "../utils/numberWithCommas";

export default function Balance() {
    const dispatch = useDispatch();
    // const { transactions } = useSelector((state) => state.transaction);
    const { transactions : transactionsBalance } = useSelector((state) => state.expense);

    useEffect(() => {
        dispatch(fetchExpense());
    }, [dispatch]);

    const calculateIncome = (transactionsBalance) => {
        let income = 0;
        transactionsBalance.forEach((transaction) => {
            const { type, amount } = transaction;
            if (type === "income") {
                income += amount;
            } else {
                income -= amount;
            }
        });

        return income;
    };

    return (
        <div className="top_card">
            <p>Your Current Balance</p>
            <h3>
                <span>৳</span>{" "}
                {transactionsBalance?.length > 0 ? (
                    <span>
                        {numberWithCommas(calculateIncome(transactionsBalance))}
                    </span>
                ) : (
                    0
                )}
            </h3>
        </div>
    );
}
