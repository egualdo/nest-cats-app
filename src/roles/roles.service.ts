import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {

  constructor(@InjectRepository(Role)
  private roleRepository: Repository<Role>
  ) { }


  create(createRoleDto: CreateRoleDto) {
    return this.roleRepository.save(createRoleDto);
  }

  findAll() {
    return this.roleRepository.find();
  }

  findOne(id: number) {
    return this.roleRepository.findOne({ where: { id } });
  }

  findOneByName({ name }: { name: string }) {
    return this.roleRepository.findOne({ where: { name } });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleRepository.update(id, updateRoleDto);
  }

  remove(id: number) {
    return this.roleRepository.delete(id);
  }
}
