import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { Role } from '@/api/user/entities/role.enum';
import { Roles } from '@/api/user/roles.decorator';
import { RolesGuard } from '@/api/user/roles.guard';
import { PaginationQueryDto } from '@/common/dto/pagination.query.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { CoordinateService } from './coordinate.service';
import { CreateCoordinateDto } from './dto/create-coordinate.dto';
import { UpdateCoordinateDto } from './dto/update-coordinate.dto';

@Controller('room/coordinate')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class CoordinateController {
  constructor(private readonly coordinateService: CoordinateService) {}

  @Post()
  create(@Body() createCoordinateDto: CreateCoordinateDto) {
    return this.coordinateService.create(createCoordinateDto);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coordinateService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coordinateService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCoordinateDto: UpdateCoordinateDto,
  ) {
    return this.coordinateService.update(+id, updateCoordinateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coordinateService.remove(+id);
  }
}
