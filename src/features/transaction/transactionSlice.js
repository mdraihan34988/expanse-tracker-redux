import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTransactionExpense, deleteTransactionExpense, updateTransactionExpense } from "../expense/expenseSlice";
import { totalPageNumber } from "../pagination/paginationSlice";
import {
    addTransaction,
    deleteTransaction,
    editTransaction,
    getTransactions
} from "./transactionAPI";

const initialState = {
    transactions: [],
    isLoading: false,
    isError: false,
    error: "",
    editing: {},
};

// async thunks
export const fetchTransactions = createAsyncThunk(
    "transaction/fetchTransactions",
    async ({type,search,pageNumber},thunkApi) => {

        const transactions = await getTransactions(type,search,pageNumber);

        let totaData = 0;

        if(transactions.headers['x-total-count']) {
            totaData = parseInt(transactions.headers['x-total-count']);
        }
        
        await thunkApi.dispatch(totalPageNumber(totaData));

        return transactions?.data;
    }
);

export const createTransaction = createAsyncThunk(
    "transaction/createTransaction",
    async (data,thunkApi) => {
        const transaction = await addTransaction(data);
        await thunkApi.dispatch(addTransactionExpense(transaction));
        return transaction;
    }
);

export const changeTransaction = createAsyncThunk(
    "transaction/changeTransaction",
    async ({ id, data },thunkApi) => {
        const transactions = await editTransaction(id, data);
        await thunkApi.dispatch(updateTransactionExpense(transactions));
        return transactions;
    }
);

export const removeTransaction = createAsyncThunk(
    "transaction/removeTransaction",
    async ({ id, pageNumber, typeFilter, search },thunkApi) => {

        const transaction = await deleteTransaction( id, pageNumber, typeFilter, search );
        await thunkApi.dispatch(deleteTransactionExpense(id));
        return transaction;
    }
);

// create slice
const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        editActive: (state, action) => {
            state.editing = action.payload;
        },
        editInActive: (state) => {
            state.editing = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
                state.transactions = [];
            })
            .addCase(createTransaction.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.transactions.unshift(action.payload);
                if(state.transactions?.length > 5) {
                    state.transactions.splice(-1);
                }
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(changeTransaction.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(changeTransaction.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;

                const indexToUpdate = state.transactions.findIndex(
                    (t) => t.id === action.payload.id
                );

                state.transactions[indexToUpdate] = action.payload;
            })
            .addCase(changeTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(removeTransaction.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(removeTransaction.fulfilled, (state, action) => {
                state.transactions = action.payload;
                state.isError = false;
                state.isLoading = false;
            })
            .addCase(removeTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            });
    },
});

export default transactionSlice.reducer;
export const { editActive, editInActive } = transactionSlice.actions;
