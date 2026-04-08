import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RolesModule } from 'src/roles/roles.module';
import { RolesService } from 'src/roles/roles.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  //el typeOrmModule.forFeature() es necesario para que la entidad User esté creada en bd
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule), RolesModule],
  controllers: [UsersController],
  providers: [UsersService, RolesService],
  exports: [UsersService],
})
//se colocal el forwardRef() para evitar el error de dependencia circular entre el AuthModule
//y el UsersModule, ya que el AuthModule importa el UsersModule y el UsersModule importa el
//AuthModule, con el forwardRef() se le dice a Nest que espere a que se resuelva la dependencia
//circular para poder importar el modulo, lo mismo con el RolesModule, ya que el UsersModule
//importa el RolesModule y el RolesModule importa el UsersModule, con el forwardRef() se le 
//dice a Nest que espere a que se resuelva la dependencia circular para poder importar el modulo 

//importamos el modulo de roles para poder usar el service

export class UsersModule { }
