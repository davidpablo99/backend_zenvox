import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data?: {
    name?: string;
    email?: string;
    password?: string;
    birthDate?: string | Date;
    cpf?: string;
  }) {
    if (!data) {
      throw new BadRequestException("Body é obrigatório");
    }

    const { name, email, password, birthDate, cpf } = data;

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

    return this.prisma.user.create({
      data: {
        name,
        email,
        password,
        cpf,
        birthDate: parsedBirthDate,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
