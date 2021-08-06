import { Injectable } from '@nestjs/common';
import { CreatePermissionOverwriteDto } from './dto/create-permission-overwrite.dto';
import { UpdatePermissionOverwriteDto } from './dto/update-permission-overwrite.dto';

@Injectable()
export class PermissionOverwriteService {
  create(createPermissionOverwriteDto: CreatePermissionOverwriteDto) {
    return 'This action adds a new permissionOverwrite';
  }

  findAll() {
    return `This action returns all permissionOverwrite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permissionOverwrite`;
  }

  update(id: number, updatePermissionOverwriteDto: UpdatePermissionOverwriteDto) {
    return `This action updates a #${id} permissionOverwrite`;
  }

  remove(id: number) {
    return `This action removes a #${id} permissionOverwrite`;
  }
}
