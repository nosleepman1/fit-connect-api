import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'le titre est une chaine de caracteres' })
  @IsNotEmpty({ message: 'le titre ne peut pas etre vide' })
  title!: string;

  @IsString({ message: 'la description est une chaine' })
  @IsOptional()
  description!: string;
}
