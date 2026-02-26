import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import type { AuthUser } from "../../types/auth.types";

interface AuthState {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
}

const tokenFromStorage = localStorage.getItem("token");
const userFromStorage = localStorage.getItem("user");

const initialState: AuthState = {
    token: tokenFromStorage ?? null,
    user: userFromStorage ? (JSON.parse(userFromStorage) as AuthUser) : null,
    isAuthenticated: Boolean(tokenFromStorage),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ token: string; user: AuthUser }>
        ) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.token;
                state.user = payload.data.user;
                state.isAuthenticated = true;
                localStorage.setItem("token", payload.token);
                localStorage.setItem("user", JSON.stringify(payload.data.user));
            }
        );

        builder.addMatcher(
            authApi.endpoints.signup.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.token;
                state.user = payload.data.user;
                state.isAuthenticated = true;
                localStorage.setItem("token", payload.token);
                localStorage.setItem("user", JSON.stringify(payload.data.user));
            }
        );
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
