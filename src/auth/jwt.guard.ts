import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { JwtPayload } from "./jwt.payload";
import type { Request } from "express";

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    const auth = request.get("authorization");

    if (!auth) {
      throw new UnauthorizedException("Token não enviado");
    }

    const [type, token] = auth.split(" ");

    if (type !== "Bearer" || !token) {
      throw new UnauthorizedException("Token mal formatado");
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token);
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException("Token inválido");
    }
  }
}
