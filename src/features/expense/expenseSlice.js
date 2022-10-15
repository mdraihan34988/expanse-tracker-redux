import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    getExpense
} from "./expenseAPI";

const initialState = {
    transactions: [],
    isLoading: false,
    isError: false,
    error: ""
};

// async thunks
export const fetchExpense = createAsyncThunk(
    "expense/fetchExpense",
    async () => {
        const expense = await getExpense();
        return expense;
    }
);


// create slice
const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers : {
        addTransactionExpense : (state, action) => {
            state.transactions.push(action.payload);
        },
        deleteTransactionExpense : (state, action) => {
            state.transactions = state.transactions.filter(t => t.id !== action.payload)
        },
        updateTransactionExpense : (state, action) => {
            const indexToUpdate = state.transactions.findIndex(
                (t) => t.id === action.payload.id
            );
            state.transactions[indexToUpdate] = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExpense.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchExpense.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.transactions = action.payload;
            })
            .addCase(fetchExpense.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
                state.transactions = [];
            })
    },
});

export default expenseSlice.reducer;
export const { addTransactionExpense, deleteTransactionExpense, updateTransactionExpense } = expenseSlice.actions;
