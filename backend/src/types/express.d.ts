

import { IUser } from "../models/user.model";

declare global {
    namespace Express {
        interface Request {
            // We define 'user' as optional since not all routes are protected
            user?: {
                id: string;
                role: "admin" | "member";
                email: string;
            };
        }
    }
}

// Export something to make it a module
export { };
