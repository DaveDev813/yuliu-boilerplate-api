import { Test, TestingModule } from '@nestjs/testing';
import { AddressbookController } from '../addressbook.controller';

describe('Addressbook Controller', () => {
  let controller: AddressbookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressbookController],
    }).compile();

    controller = module.get<AddressbookController>(AddressbookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
