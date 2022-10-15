// import { getnumberOfTransactionsAPI } from "./numberOfTransactionsAPI";
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    pageNumber : 1,
    numberOfPages : 0,
    isLoading: false,
    isError: false,
    error: "",
};

// export const fetchNumberOfTransactions = createAsyncThunk(
//     "pagination/fetchNumberOfTransactions",
//     async ({ search, type }) => {
//         const Transactions = await getnumberOfTransactionsAPI( search, type );
//         return Transactions;
//     }
// );

const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        pagenumberChange: (state, action) => {
            state.pageNumber = action.payload;
        },
        pagenumberReset: (state, action) => {
            state.pageNumber = 1;
        },
        totalPageNumber: (state, action) => {
            let total = Math.ceil(action.payload/5);
            
            if( total < state.pageNumber ) {
                state.pageNumber = 1;
            }

            state.numberOfPages = Math.ceil(action.payload/5);

        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchNumberOfTransactions.pending, (state) => {
    //             state.isError = false;
    //             state.isLoading = true;
    //         })
    //         .addCase(fetchNumberOfTransactions.fulfilled, (state, action) => {
    //             state.isLoading = false;
    //             state.numberOfPages = Math.ceil(action.payload.length/5);
    //         })
    //         .addCase(fetchNumberOfTransactions.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.isError = true;
    //             state.error = action.error?.message;
    //         });
    // },
});

export default paginationSlice.reducer;
export const { pagenumberChange, pagenumberReset, totalPageNumber } = paginationSlice.actions;
