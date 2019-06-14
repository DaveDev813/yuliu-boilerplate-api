import { Test, TestingModule } from '@nestjs/testing';
import { VendorUsersService } from './vendor-users.service';

describe('VendorUsersService', () => {
  let service: VendorUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VendorUsersService],
    }).compile();

    service = module.get<VendorUsersService>(VendorUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
