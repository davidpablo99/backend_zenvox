import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException("Email ou senha inválidos");
    }

    // corrigir senha para bcrypt depois
    if (user.password !== password) {
      throw new UnauthorizedException("Email ou senha inválidos");
    }

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
    };
  }
}
