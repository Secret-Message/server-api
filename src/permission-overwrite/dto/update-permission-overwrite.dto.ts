import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionOverwriteDto } from './create-permission-overwrite.dto';

export class UpdatePermissionOverwriteDto extends PartialType(CreatePermissionOverwriteDto) {}
