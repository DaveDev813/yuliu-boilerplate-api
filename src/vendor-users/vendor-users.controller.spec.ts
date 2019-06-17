import { Test, TestingModule } from '@nestjs/testing';
import { VendorUsersController } from './vendor-users.controller';

describe('VendorUsers Controller', () => {
  let controller: VendorUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendorUsersController],
    }).compile();

    controller = module.get<VendorUsersController>(VendorUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
