import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/role.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import type { ActiveUserInterface } from '../common/interfaces/active-user.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Get('profile')
    @Auth(Role.ADMIN)
    // @Roles(Role.ADMIN)
    // @UseGuards(AuthGuard, RolesGuard)//agregamos el guard de autenticacion y el de roles

    profile(@ActiveUser() user: ActiveUserInterface) {
        return this.authService.profile(user);
    }

    @Post('change-role')
    @Auth(Role.ADMIN)
    changeRole(@Body() { email, roleId }: { email: string, roleId: string }) {
        return this.authService.changeRole({ email, roleId });
    }

}
