import { AuthResponseDTO, LoginDTO, SignUpDTO } from "@/types/auth.types";
import UserModel, { IUser } from "../models/User.model";
import { AppError } from "../utils/AppError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signToken = (id: string) => {
    const secret = process.env.JWT_SECRET;
    const expires = process.env.JWT_EXPIRES_IN;

    if (!secret || !expires) {
        throw new Error("JWT Configuration is missing in .env file");
    }

    return jwt.sign({ id }, secret, { expiresIn: expires as any });
};


export const signUpUser = async (userData: SignUpDTO) => {
    const existingUser = await UserModel.findOne({ email: userData.email });
    if (existingUser) {
        throw new AppError("Email already in use", 400);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password!, salt);

    const newUser = await UserModel.create({
        ...userData,
        password: hashedPassword,
    });

    const token = signToken(newUser._id.toString());
    return {
        token,
        user: {
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            userId: newUser._id,
        },
    };
}

export const loginUser = async (
    { email, password }: LoginDTO
): Promise<AuthResponseDTO> => {

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new AppError("Invalid email or password", 401);
    }

    const token = signToken(user._id.toString());

    return {
        token,
        user: {
            name: user.name,
            email: user.email,
            role: user.role,
            userId: user._id.toString(),
        },
    };
};