import { PrismaService } from "../../prisma/prisma.service";
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data?: {
        name?: string;
        email?: string;
        password?: string;
        birthDate?: string | Date;
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
    findByEmail(email: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        cpf: string;
        birthDate: Date;
        address: string | null;
        created_at: Date;
    } | null>;
}
