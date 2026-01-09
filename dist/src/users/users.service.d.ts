import { PrismaService } from "../../prisma/prisma.service";
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data?: {
        name?: string;
        email?: string;
        password?: string;
        birthDate?: string | Date;
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
    findByEmail(email: string): Promise<{
        name: string;
        email: string;
        password: string;
        birthDate: Date;
        cpf: string;
        id: string;
        created_at: Date;
    } | null>;
}
