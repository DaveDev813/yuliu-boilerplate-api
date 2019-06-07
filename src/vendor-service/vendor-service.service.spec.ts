import { Test, TestingModule } from '@nestjs/testing';
import { VendorServiceService } from './vendor-service.service';

describe('VendorServiceService', () => {
  let service: VendorServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VendorServiceService],
    }).compile();

    service = module.get<VendorServiceService>(VendorServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
