import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail({}, { message: 'Veuillez fournir un email valide.' })
  email!: string;

  @IsString()
  @MinLength(3, {
    message: 'Le mot de passe doit contenir au moins 3 caractères.',
  })
  password!: string;
}
