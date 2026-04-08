import { IsInt, IsPositive, IsString, MinLength } from "class-validator";

export class CreateCatDto {

    @IsString()
    @MinLength(3)
    name!: string;
    //el ! indica que se inicializará posteriormente, es decir, no es necesario asignarle un valor en el momento de la declaración

    @IsInt()
    @IsPositive()
    age!: number;

    @IsString()
    @MinLength(3)
    breed!: string;
}
