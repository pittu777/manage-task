export interface SignUpDTO {
    name: string;
    email: string;
    password: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}
export interface AuthResponseDTO {
    token: string;
    user: {
        name: string;
        email: string;
        role: string;
        userId: string;
    };
}