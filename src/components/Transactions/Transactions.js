import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../features/filter/filterSlice";
import { fetchTransactions } from "../../features/transaction/transactionSlice";
import Transaction from "./Transaction";
import { useMatch } from "react-router-dom";
import { pagenumberReset } from "../../features/pagination/paginationSlice";

export default function Transactions() {
    const dispatch = useDispatch();

    const { transactions, isLoading, isError, error} = useSelector(
        (state) => state.transaction
    );
    const { type, search } = useSelector((state) => state.filter);
    const { pageNumber } = useSelector((state) => state.pagination);
    const match = useMatch("/");

    useEffect(() => {
        if(match) {
            dispatch(pagenumberReset());
            dispatch(resetFilter());
            dispatch(fetchTransactions({type:"",search:"",pageNumber:1}));
        } else {
            dispatch(fetchTransactions({type,search,pageNumber}));
        }
    }, [dispatch,type,search,pageNumber,match]);

    // decide what to render
    let content = null;
    if (isLoading) content = <p>Loading...</p>;

    if (!isLoading && isError)
        content = <p className="error">There was an error occured - {error}</p>;

    if (!isLoading && !isError && transactions?.length > 0) {
        content = transactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
        ));
    }

    if (!isLoading && !isError && transactions?.length === 0) {
        content = <p>No transactions found!</p>;
    }

    return (
        <>
            <p className="second_heading">Your Transactions:</p>

            <div className="conatiner_of_list_of_transactions">
                <ul>{content}</ul>
            </div>
        </>
    );
}
