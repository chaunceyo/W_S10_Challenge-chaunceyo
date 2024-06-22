import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    size : 'All'}

export const filters = createSlice({
    name : 'filters',
    initialState,
    reducers: {
        selectFiltered(state, action) {
            //console.log(action.payload)
            state.size = action.payload
        },
    }
})

export const {
    selectFiltered
} = filters.actions

export default filters.reducer