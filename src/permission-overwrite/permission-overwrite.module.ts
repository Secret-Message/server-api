import { Module } from '@nestjs/common';
import { PermissionOverwriteService } from './permission-overwrite.service';
import { PermissionOverwriteController } from './permission-overwrite.controller';

@Module({
  controllers: [PermissionOverwriteController],
  providers: [PermissionOverwriteService]
})
export class PermissionOverwriteModule {}
