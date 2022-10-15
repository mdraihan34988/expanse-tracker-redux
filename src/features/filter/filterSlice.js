const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    search: "",
    type:""
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        searched: (state, action) => {
            state.search = action.payload;
        },
        addtype: (state, action) => {
            state.type = action.payload;
        },
        resetFilter: (state, action) => {
            state.search = initialState.search;
            state.type = initialState.type;
        }
    },
});

export default filterSlice.reducer;
export const { searched, resetFilter, addtype } = filterSlice.actions;
