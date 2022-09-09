import { JwtAuthGuard } from './../api/user/auth/auth.guard';
import { CreateBuildingDto, UpdateBuildingDto } from './building.dto';
import { PaginationQueryDto } from './../common/dto/pagination.query.dto';
import { BuildingService } from './building.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from '@/api/user/roles.decorator';
import { Role } from '@/api/user/entities/role.enum';
import { RolesGuard } from '@/api/user/roles.guard';

@Controller('building')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.buildingService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.buildingService.findOne(id);
  }

  @Post()
  create(@Body() createBuildingDto: CreateBuildingDto) {
    return this.buildingService.create(createBuildingDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBuildingDto: UpdateBuildingDto,
  ) {
    return this.buildingService.update(id, updateBuildingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buildingService.remove(id);
  }
}
