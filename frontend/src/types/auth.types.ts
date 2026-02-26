export interface AuthUser {
    name: string;
    email: string;
    role: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignupRequest {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    status: string;
    token: string;
    data: {
        user: AuthUser;
    };
}