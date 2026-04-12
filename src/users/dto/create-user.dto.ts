import { IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    name!: string;//el ! indica que se inicializará posteriormente, es decir, no es necesario asignarle un valor en el momento de la declaración

    @IsString()
    email!: string;
    @IsString()
    password!: string;
    @IsNumber()
    role!: string;
}
