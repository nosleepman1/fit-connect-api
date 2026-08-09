import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { UserService } from '../../user/user.service';
import { UserEntity } from '../../user/entities/user.entity';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { compare } from 'bcrypt';
import { LoginResponse, Payload } from '../types/auth.types';
import { JwtService } from '@nestjs/jwt';
import { MAILER_TOKEN } from 'src/infrastructure/mail/contracts/tokens';
import { MailerInterface } from 'src/infrastructure/mail/contracts/mailer.interface';
import { AuthMailerService } from './auth-mailer.service';
import { AUTH_REPOSITORY_TOKEN } from '../contracts/tokens';
import { AuthRepositoryInterface } from '../contracts/auth-repository.interface';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly authMailerService: AuthMailerService,
    @Inject(AUTH_REPOSITORY_TOKEN)
    private readonly authRepository: AuthRepositoryInterface,
    @InjectQueue('sendEmailVerification')
    private readonly sendEmailVerification: Queue,
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

    const token = await this.registerVerificationCode(userEntity.id);

    await this.authMailerService.sendVerificationEmail(userEntity, token);

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

  async verifyAcount(userId: string, token: string): Promise<void> {
    const gettedCode = await this.authRepository.getVerificationCode(userId);
    if (!gettedCode) {
      throw new NotFoundException('Code de verification introuvable');
    }

    if (gettedCode !== token) {
      throw new UnauthorizedException('Code de verification incorrect');
    }

    const User: UserEntity | null = await this.userService.findOne(userId);

    if (!User) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    const updatedUser: UserEntity = await this.userService.update(userId, {
      isVerified: true,
    });

    await this.authRepository.deleteVerificationCode(userId);
  }

  async registerVerificationCode(userId: string): Promise<string> {
    const token = this.generateVerificationCode();
    const savedCode = await this.authRepository.saveVerificationCode(
      userId,
      token,
    );
    return savedCode;
  }

  private generateToken(payload: Payload): string {
    return this.jwtService.sign(payload);
  }

  private generateVerificationCode(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
}
