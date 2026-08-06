import {
  IsEmail,
  IsString,
  IsEnum,
  IsOptional,
  MinLength,
} from 'class-validator';
import type { Role } from '../types/user.types';

export class CreateUserDto {
  @IsEmail({}, { message: 'Veuillez fournir un email valide.' })
  email!: string;

  @IsString()
  @MinLength(3, {
    message: 'Le mot de passe doit contenir au moins 3 caractères.',
  })
  password!: string;

  @IsEnum(['ADMIN', 'USER', 'COACH'], {
    message: 'Veuillez fournir un rôle valide.',
  })
  @IsOptional()
  role!: Role;
}
