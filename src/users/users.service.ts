import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data?: {
    name?: string;
    email?: string;
    password?: string;
    birthDate?: string | Date;
    address?: string;
    cpf?: string;
  }) {
    if (!data) {
      throw new BadRequestException("Body é obrigatório");
    }

    const { name, email, password, birthDate, cpf, address } = data;

    if (!name || !email || !password || !birthDate || !cpf) {
      throw new BadRequestException(
        "Campos obrigatórios: name, email, password, birthDate, cpf",
      );
    }

    const parsedBirthDate =
      birthDate instanceof Date ? birthDate : new Date(birthDate);

    if (Number.isNaN(parsedBirthDate.getTime())) {
      throw new BadRequestException("birthDate inválido");
    }

    const userExists = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { cpf }],
      },
    });

    if (userExists) {
      if (userExists.email === email) {
        throw new ConflictException("Email já está em uso");
      }
      if (userExists.cpf === cpf) {
        throw new ConflictException("CPF já está em uso");
      }
    }

    const passwordHash = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        cpf,
        birthDate: parsedBirthDate,
        address,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
