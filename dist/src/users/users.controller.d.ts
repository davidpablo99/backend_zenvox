import { UsersService } from "./users.service";
import type { Request } from "express";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(body: {
        name?: string;
        email?: string;
        password?: string;
        birthDate?: string;
        address?: string;
        cpf?: string;
    }): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        cpf: string;
        birthDate: Date;
        address: string | null;
        created_at: Date;
    }>;
    me(req: Request): import("../auth/jwt.payload").JwtPayload | undefined;
}
