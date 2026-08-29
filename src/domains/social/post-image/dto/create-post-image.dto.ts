import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreatePostImageDto {

    @IsString({ message: 'le chemin est une chaine de caractere' })
    @IsNotEmpty({ message: 'le chemin ne doit pas etre vide' })
    path!: string;

    @IsBoolean({ message: 'la couverture est un boolean' })
    isCover!: boolean;
}
