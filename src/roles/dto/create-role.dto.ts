import { IsString, MinLength } from "class-validator";

export class CreateRoleDto {
    @IsString()
    @MinLength(3)
    name!: string;//el ! indica que se inicializará posteriormente, es decir, no es necesario asignarle un valor en el momento de la declaración

}
