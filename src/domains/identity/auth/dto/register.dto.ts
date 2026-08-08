import {
  IsEmail,
  IsEnum,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';
export class RegisterDto {
  @IsString({ message: 'Veuillez fournir un prénom valide.' })
  firstName!: string;

  @IsString({ message: 'Veuillez fournir un nom valide.' })
  lastName!: string;

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
  role!: string;
}
