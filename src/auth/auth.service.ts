import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from "@nestjs/jwt";
import { Role } from 'src/common/enums/role.enum';
import { RolesService } from 'src/roles/roles.service';


@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly roleService: RolesService) { }


    async login(loginDto: LoginDto) {
        //buscamos el usuario por email
        const findUser = await this.userService.findOneByEmailWithPassword(loginDto.email);
        if (!findUser) {
            throw new BadRequestException('Invalid credentials');
        }

        //comparamos los passwords
        const isMatch = await bcryptjs.compare(loginDto.password, findUser.password);
        if (!isMatch) {
            throw new BadRequestException('Invalid credentials');
        }

        //retornamos el token de session con la informacion del usuario
        const payload = { email: findUser.email, roleId: findUser.roleId };
        //->
        const token = await this.jwtService.signAsync(payload);

        return {
            token: token,
            email: findUser.email,
            roleId: findUser.roleId
        };

    }

    async register(registerDto: RegisterDto) {

        const existingUser = await this.userService.findOneByEmail(registerDto.email);
        if (existingUser) {
            throw new BadRequestException('User already exists');
        }

        const role = await this.roleService.findOneByName({ name: Role.USER });
        if (!role) {
            throw new BadRequestException('Role not found');
        }
        const user = await this.userService.create({
            name: registerDto.name,
            email: registerDto.email,
            password: await bcryptjs.hash(registerDto.password, +process.env.HASH_SALT_OR_ROUNDS || 10),
            //colocamos el + para convertir el valor a number, ya que por defecto las env variables son string
            roleId: role.name
        });

        return { user: user.email, roleId: user.roleId };
    }

    async profile({ email, roleId }: { email: string, roleId: string }) {
        return await this.userService.findOneByEmail(email);
    }

    async changeRole({ email, roleId }: { email: string, roleId: string }) {
        const user = await this.userService.findOneByEmail(email);

        const role = await this.roleService.findOneByName({ name: roleId });
        if (!role) {
            throw new BadRequestException('Role not found');
        }

        if (!user) {
            throw new BadRequestException('User not found');
        }
        user.roleId = roleId;
        return await this.userService.update(user.id, user);

    }
}
