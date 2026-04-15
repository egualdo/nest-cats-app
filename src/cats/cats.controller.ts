import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/role.enum';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import type { ActiveUserInterface } from '../common/interfaces/active-user.interface';
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
@ApiTags('cats')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@Auth(Role.USER)//se usa para proteger todas las rutas del controlador, solo los usuarios con el rol de USER podran acceder a estas rutas, si queremos que solo los ADMIN puedan acceder a estas rutas, cambiamos Role.USER por Role.ADMIN
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) { }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(@Body() createCatDto: CreateCatDto, @ActiveUser() user: ActiveUserInterface) {
    return this.catsService.create(createCatDto, user);
  }

  @Get()
  findAll(@ActiveUser() user: ActiveUserInterface) {
    return this.catsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @ActiveUser() user: ActiveUserInterface) {
    return this.catsService.findOne(id, user);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto, @ActiveUser() user: ActiveUserInterface) {
    return this.catsService.update(id, updateCatDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @ActiveUser() user: ActiveUserInterface) {
    return this.catsService.remove(id, user);
  }
}
