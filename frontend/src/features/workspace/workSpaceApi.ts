import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";


export const workSpaceApi = createApi({
    reducerPath: "workspaceApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000"
            }/api/v1/workspaces`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },

    }),
    endpoints: (builder) => ({
        createWorkSpace: builder.mutation({
            query: (body) => ({
                url: "",
                method: "POST",
                body,
            }),
        })
    })
})


export const { useCreateWorkSpaceMutation } = workSpaceApi;