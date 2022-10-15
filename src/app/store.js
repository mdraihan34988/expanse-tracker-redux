import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../features/transaction/transactionSlice";
import filterReducer from "../features/filter/filterSlice";
import paginationReducer from "../features/pagination/paginationSlice";
import expenseReducer from "../features/expense/expenseSlice";

export const store = configureStore({
    reducer: {
        transaction: transactionReducer,
        filter: filterReducer,
        pagination: paginationReducer,
        expense: expenseReducer
    },
});
