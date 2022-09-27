import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../utils/axios.js"
import { getPaginationData } from "./paginationAPI.js"

const initialState = {
    isLoading: false,
    isError: false,
    error: '',
    pageNo: 1,
    limitedData: [],
}

export const fetchPaginationData = createAsyncThunk("transactions/fetchLimitedData", async ({ type = "", pageNo = 1, searchText = "" }) => {
    const limit = 5
    const getLimitedData = await getPaginationData(limit, pageNo, type, searchText);

    return getLimitedData;
})
export const deletePaginationData = createAsyncThunk("transactions/deleteLimitedData", async (id) => {
    const response = axios.delete(`/transactions/${id}`);

    return response.data;
})

const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        selectedPage: (state, action) => {
            state.pageNo = action.payload
        },
        getDeleteId: (state, action) => {
            state.limitedData = state.limitedData.filter(
                (t) => t.id !== action.payload
            );
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaginationData.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(fetchPaginationData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.limitedData = action.payload
            })
            .addCase(fetchPaginationData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.limitedData = []
            })
            .addCase(deletePaginationData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
            })
    }
})

export default paginationSlice.reducer;
export const { selectedPage, getDeleteId } = paginationSlice.actions;