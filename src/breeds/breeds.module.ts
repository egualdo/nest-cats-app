import { Module } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { BreedsController } from './breeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { AuthModule } from 'src/auth/auth.module';
import { RolesService } from 'src/roles/roles.service';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Breed]), AuthModule, RolesModule],
  controllers: [BreedsController],
  providers: [BreedsService, RolesService],
  exports: [TypeOrmModule],
})
export class BreedsModule { }
