import { Test, TestingModule } from '@nestjs/testing';
import { PermissionOverwriteController } from './permission-overwrite.controller';
import { PermissionOverwriteService } from './permission-overwrite.service';

describe('PermissionOverwriteController', () => {
  let controller: PermissionOverwriteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionOverwriteController],
      providers: [PermissionOverwriteService],
    }).compile();

    controller = module.get<PermissionOverwriteController>(PermissionOverwriteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
