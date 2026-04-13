import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector, private readonly roleService: RolesService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const roles = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    console.log("rol del usuario:", user.roleId === Role.ADMIN);
    if (user.roleId === Role.ADMIN) {
      return true;// le damos permiso al admin para acceder a cualquier ruta protegida por este guard
    }

    return roles === user.roleId;
  }
}
