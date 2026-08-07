import {
  IsEmail,
  IsString,
  IsEnum,
  IsOptional,
  MinLength,
  IsBoolean,
} from 'class-validator';
import type { Role } from '../types/user.types';

export class CreateUserDto {
  @IsString({ message: 'Veuillez fournir un prénom valide.' })
  firstName!: string;

  @IsString({ message: 'Veuillez fournir un nom valide.' })
  lastName!: string;

  @IsBoolean({ message: 'Veuillez fournir une valeur booléenne valide.' })
  @IsOptional()
  isVerified!: boolean;

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
