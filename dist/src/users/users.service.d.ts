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
        name: string;
        email: string;
        password: string;
        birthDate: Date;
        cpf: string;
        address: string | null;
        id: string;
        created_at: Date;
    }>;
    findByEmail(email: string): Promise<{
        name: string;
        email: string;
        password: string;
        birthDate: Date;
        cpf: string;
        address: string | null;
        id: string;
        created_at: Date;
    } | null>;
}
