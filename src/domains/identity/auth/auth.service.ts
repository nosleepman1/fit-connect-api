import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { compare } from 'bcrypt';
import { LoginResponse, Payload } from './types/auth.types';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserEntity> {
    const user = await this.userService.findByEmail(registerDto.email);

    if (user) {
      throw new ConflictException('Cet utilisateur existe déja');
    }
    const hashedPassword = await this.userService.hashPassword(
      registerDto.password,
    );
    const newUser = {
      ...registerDto,
      password: hashedPassword,
    };
    const userEntity = await this.userService.create(newUser as CreateUserDto);

    return userEntity;
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const existingUser = await this.userService.findByEmail(loginDto.email);

    if (!existingUser) {
      throw new NotFoundException(' Email ou Mot de passe incorrect');
    }

    const isMatch: boolean = await compare(
      loginDto.password,
      existingUser.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException('Email ou Mot de passe incorrect');
    }

    const payload: Payload = {
      sub: existingUser.id,
      email: existingUser.email,
    };
    const token = this.generateToken(payload);

    const { password, ...userWithoutPassword } = existingUser;

    return {
      token,
      user: userWithoutPassword,
    };
  }

  private generateToken(payload: Payload): string {
    return this.jwtService.sign(payload);
  }
}
