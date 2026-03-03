import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";


interface Work {
    name: string;
    id: string;
    owner: string;
    members: string[];
}

interface Workspaces {
    status: string,
    data: Work[]
}

type SingleMember = {
    email: string,
    name: string,
}
interface SingleWork {
    members: SingleMember[],
    name: string,
    owner: SingleMember,

}

interface SingleWorkSPace {
    status: string;
    data: SingleWork
}


export const workSpaceApi = createApi({
    reducerPath: "workspaceApi",
    tagTypes: ["Workspaces"],
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
            invalidatesTags: ["Workspaces"]
        }),
        getWorkSpaces: builder.query<Workspaces, void>({
            query: () => ({
                url: "",
                method: "GET",
            }),
            providesTags: ["Workspaces"],
            keepUnusedDataFor: 300,
        }),
        getSingleWorkSPace: builder.query<SingleWorkSPace, string>({
            query: (id) => ({
                url: `/${id}`,
                method: "GET",
            }),

        })
    })
})


export const { useCreateWorkSpaceMutation, useGetWorkSpacesQuery, useGetSingleWorkSPaceQuery } = workSpaceApi;
