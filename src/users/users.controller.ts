import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtGuard } from "src/auth/jwt.guard";
import type { Request } from "express";

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
      address?: string;
      cpf?: string;
    },
  ) {
    return this.usersService.create(body);
  }

  @UseGuards(JwtGuard)
  @Get("me")
  me(@Req() req: Request) {
    return req.user;
  }
}
