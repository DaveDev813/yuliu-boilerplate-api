import { Test, TestingModule } from '@nestjs/testing';
import { AddressbookService } from '../services/addressbook.service';

describe('AddressbookService', () => {
  let service: AddressbookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressbookService],
    }).compile();

    service = module.get<AddressbookService>(AddressbookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
