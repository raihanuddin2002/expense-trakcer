import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../features/transaction/transactionSlice";
import paginationReducer from "../features/pagination/paginationSlice";
import { apiSlice } from "../features/Api/apiSlice";

export const store = configureStore({
    reducer: {
        transaction: transactionReducer,
        pagination: paginationReducer,
        [apiSlice.reducerPath]: apiSlice.reducer // Rtk Query
    },
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware)
});
