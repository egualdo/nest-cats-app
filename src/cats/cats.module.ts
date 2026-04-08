import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { BreedsModule } from 'src/breeds/breeds.module';
import { BreedsService } from 'src/breeds/breeds.service';
import { Breed } from 'src/breeds/entities/breed.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cat]), BreedsModule, AuthModule],// importamos el modulo de las razas para poder usar el services
  controllers: [CatsController],
  providers: [CatsService, BreedsService],
  exports: [],
})
export class CatsModule { }
