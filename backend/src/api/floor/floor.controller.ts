import { RolesGuard } from './../user/roles.guard';
import { Role } from './../user/entities/role.enum';
import { JwtAuthGuard } from './../user/auth/auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { FloorService } from './floor.service';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';
import { Roles } from '../user/roles.decorator';

@Controller('floor')
@Controller('building')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class FloorController {
  constructor(private readonly floorService: FloorService) {}

  @Post()
  create(@Body() createFloorDto: CreateFloorDto) {
    return this.floorService.create(createFloorDto);
  }

  @Get()
  findAll() {
    return this.floorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.floorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFloorDto: UpdateFloorDto) {
    return this.floorService.update(+id, updateFloorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.floorService.remove(+id);
  }
}
