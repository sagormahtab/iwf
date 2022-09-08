import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { UpdateNameDto, updateRoleDto } from './user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async updateName(body: UpdateNameDto, req: Request): Promise<User> {
    const user: User = <User>req.user;

    user.name = body.name;

    return this.repository.save(user);
  }

  public async updateRole(body: updateRoleDto, req: Request): Promise<User> {
    const user = await this.repository.findOne({ where: { id: body.userId } });
    user.roles = body.roles;

    return this.repository.save(user);
  }
}
