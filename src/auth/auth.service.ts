import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) { }


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
        const payload = { email: findUser.email, role: findUser.role };
        //->
        const token = await this.jwtService.signAsync(payload);

        return {
            token: token,
            email: findUser.email,
            role: findUser.role
        };

    }

    async register(registerDto: RegisterDto) {

        const existingUser = await this.userService.findOneByEmail(registerDto.email);
        if (existingUser) {
            throw new BadRequestException('User already exists');
        }

        const user = await this.userService.create({
            name: registerDto.name,
            email: registerDto.email,
            password: await bcryptjs.hash(registerDto.password, +process.env.HASH_SALT_OR_ROUNDS || 10),
            //colocamos el + para convertir el valor a number, ya que por defecto las env variables son string
            role: 'user'
        });

        return { user: user.email, role: user.role };
    }

    async profile({ email, role }: { email: string, role: string }) {
        return await this.userService.findOneByEmail(email);
    }
}
