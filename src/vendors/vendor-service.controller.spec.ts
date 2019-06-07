import { Test, TestingModule } from '@nestjs/testing';
import { VendorServiceController } from './vendor-service.controller';

describe('VendorService Controller', () => {
  let controller: VendorServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendorServiceController],
    }).compile();

    controller = module.get<VendorServiceController>(VendorServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
