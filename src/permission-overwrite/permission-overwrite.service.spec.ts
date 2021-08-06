import { Test, TestingModule } from '@nestjs/testing';
import { PermissionOverwriteService } from './permission-overwrite.service';

describe('PermissionOverwriteService', () => {
  let service: PermissionOverwriteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionOverwriteService],
    }).compile();

    service = module.get<PermissionOverwriteService>(PermissionOverwriteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
