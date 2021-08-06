import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionOverwriteService } from './permission-overwrite.service';
import { CreatePermissionOverwriteDto } from './dto/create-permission-overwrite.dto';
import { UpdatePermissionOverwriteDto } from './dto/update-permission-overwrite.dto';

@Controller('permission-overwrite')
export class PermissionOverwriteController {
  constructor(private readonly permissionOverwriteService: PermissionOverwriteService) {}

  @Post()
  create(@Body() createPermissionOverwriteDto: CreatePermissionOverwriteDto) {
    return this.permissionOverwriteService.create(createPermissionOverwriteDto);
  }

  @Get()
  findAll() {
    return this.permissionOverwriteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionOverwriteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionOverwriteDto: UpdatePermissionOverwriteDto) {
    return this.permissionOverwriteService.update(+id, updatePermissionOverwriteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionOverwriteService.remove(+id);
  }
}
