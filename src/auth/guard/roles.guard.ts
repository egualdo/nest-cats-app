import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role | Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user || {};

    // Normalize user role name whether it's stored as roleId (string),
    // as a `role` relation (entity with `name`), or other shape.
    let userRoleName: string | undefined;
    if (user.role) {
      userRoleName = typeof user.role === 'string' ? user.role : user.role.name;
    } else if (user.roleId) {
      userRoleName = user.roleId;
    }

    if (!userRoleName) {
      return false;
    }

    // Admins always have access
    if (userRoleName === Role.ADMIN) {
      return true;
    }

    // Support single role or array of roles in the decorator
    if (Array.isArray(requiredRoles)) {
      return (requiredRoles as Role[]).includes(userRoleName as Role);
    }

    return requiredRoles === (userRoleName as Role);
  }
}
