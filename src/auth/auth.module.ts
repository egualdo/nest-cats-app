import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt'; //se importa el JwtModule para poder usarlo en el AuthService
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesService } from 'src/roles/roles.service';
import { RolesModule } from 'src/roles/roles.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    RolesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("SECRET_KEY"),
        signOptions: { expiresIn: "1d" },
        global: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule] //exportamos el AuthService para poder usarlo en otros modulos, como el UsersModule por ejemplo
})
export class AuthModule { }
