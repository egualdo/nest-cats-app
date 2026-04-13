import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>) { }

  async create(createUserDto: CreateUserDto) {
    // const role = await this.roleRepository.findOneBy({ name: createUserDto.role });

    // if (!role) {
    //   throw new Error('Role not found');
    // }

    const user = this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      roleId: createUserDto.roleId
    });
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findOneByEmailWithPassword(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: ['password', 'role', 'email']
    });
  }


  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    let role;
    if (updateUserDto.roleId) {
      role = await this.roleRepository.findOneBy({
        id: updateUserDto.roleId,
      });

      if (!role || role === null) {
        throw new BadRequestException('role not found');
      }
    }

    return await this.userRepository.save({
      ...user,
      ...updateUserDto,
      role,
    });
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    return await this.userRepository.remove(user);
  }
}
