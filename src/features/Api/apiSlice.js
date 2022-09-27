import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:9000",
    }),
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => `/videos`
        }),
        addVideo: builder.mutation({
            query: (data) => ({
                url: "/videos",
                method: "POST",
                body: data
            })
        })
    })
})

export const { useGetVideosQuery } = apiSlice;