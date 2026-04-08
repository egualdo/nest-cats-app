import { SetMetadata } from "@nestjs/common";//obtenemos los datos del decorador
import { Role } from "../../common/enums/role.enum";
export const ROLES_KEY = 'roles';//definimos una constante para el nombre del decorador
export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role);