import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  async create(
    @Body()
    body: {
      name?: string;
      email?: string;
      password?: string;
      birthDate?: string;
      cpf?: string;
    },
  ) {
    return this.usersService.create(body);
  }
}
