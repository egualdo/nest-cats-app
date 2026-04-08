import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    @MinLength(2)
    name!: string; //el ! indica que se inicializará posteriormente, es decir, no es necesario asignarle un valor en el momento de la declaración

    @IsEmail()
    email!: string;
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(4)
    password!: string;
}