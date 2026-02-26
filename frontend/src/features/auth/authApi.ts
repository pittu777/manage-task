import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";
import type {
    AuthResponse,
    LoginRequest,
    SignupRequest,
} from "../../types/auth.types";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000"
            }/api/v1/auth`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        signup: builder.mutation<AuthResponse, SignupRequest>({
            query: (body) => ({
                url: "/signup",
                method: "POST",
                body,
            }),
        }),

        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (body) => ({
                url: "/login",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useSignupMutation, useLoginMutation } = authApi;