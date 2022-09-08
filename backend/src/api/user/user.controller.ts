import {
  ClassSerializerInterceptor,
  Controller,
  Req,
  UseGuards,
  UseInterceptors,
  Put,
  Body,
  Inject,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { UpdateNameDto, updateRoleDto } from './user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { RolesGuard } from '@/api/user/roles.guard';
import { Roles } from './roles.decorator';
import { Role } from './entities/role.enum';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Put('name')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private updateName(
    @Body() body: UpdateNameDto,
    @Req() req: Request,
  ): Promise<User> {
    return this.service.updateName(body, req);
  }

  @Put('role')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private updateRole(
    @Body() body: updateRoleDto,
    @Req() req: Request,
  ): Promise<User> {
    return this.service.updateRole(body, req);
  }
}
