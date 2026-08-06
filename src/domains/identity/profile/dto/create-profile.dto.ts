import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/infrastructure/database/generated/prisma/enums';

export class CreateProfileDto {
  @IsString({ message: 'le prenom doit etre une chaine de caractere' })
  @MinLength(3, { message: 'le prenom doit contenir au moins 3 caracteres' })
  @MaxLength(100, {
    message: 'le prenom doit contenir au plus 100 caracteres',
  })
  @IsOptional()
  firstName!: string;

  @IsString({ message: 'le nom doit etre une chaine de caractere' })
  @MinLength(3, { message: 'le nom doit contenir au moins 3 caracteres' })
  @MaxLength(100, { message: 'le nom doit contenir au plus 100 caracteres' })
  @IsOptional()
  lastName!: string;

  @IsString({ message: 'l avatarUrl doit etre une chaine de caractere' })
  @IsOptional()
  avatarUrl!: string;

  @IsString({ message: 'le bio doit etre une chaine de caractere' })
  @IsOptional()
  bio!: string;

  @IsString({
    message: 'Numero incorrect',
  })
  @IsOptional()
  phone!: string;

  @IsDateString({}, { message: 'la date saisie est incorrecte' })
  @IsOptional()
  dateOfBirth!: Date;

  @IsEnum(Gender, { message: 'le genre doit etre un genre' })
  @IsOptional()
  gender!: Gender;

  @IsNumber({}, { message: 'la taille doit etre un nombre' })
  @IsOptional()
  height!: number;

  @IsNumber({}, { message: 'le poids doit etre un nombre' })
  @IsOptional()
  weight!: number;
}
