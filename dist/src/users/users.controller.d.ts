import { UsersService } from "./users.service";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(body: {
        name?: string;
        email?: string;
        password?: string;
        birthDate?: string;
        cpf?: string;
    }): Promise<{
        name: string;
        email: string;
        password: string;
        birthDate: Date;
        cpf: string;
        id: string;
        created_at: Date;
    }>;
}
