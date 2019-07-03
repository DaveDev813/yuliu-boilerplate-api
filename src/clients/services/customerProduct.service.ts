import { Injectable, Inject } from '@nestjs/common';
import { Repository, InsertResult } from 'typeorm';
import { NewClientDto, UpdateClientDto } from '../dto/client.dto';
import { Clients_Information } from '../entities/clients.entity';
import { Client_Accounts } from '../entities/clientAccounts.entity';
import { Vendors, VendorProducts } from '../../vendors/entities/vendors.entity';

@Injectable()
export class CustomerProductService{

  constructor(
    @Inject('VENDOR_REPOSITORY')
    private readonly vendors: Repository<Vendors>,
    @Inject('CLIENT_ACCOUNT_REPOSITORY')
    private readonly clientAccount: Repository<Client_Accounts>,
    @Inject('CLIENT_INFO_REPOSITORY')
    private readonly clientInformation: Repository<Clients_Information>,
    @Inject('VENDOR_PRODUCT_REPOSITORY')
    private readonly vendorProducts: Repository<VendorProducts>,    
  ) {
  }

  async getCustomerServiceCategories(){
    return await this.vendors.createQueryBuilder().select(`DISTINCT vendors.businessType`).limit(10).getRawMany();
  }

  async getCustomerServices(){
    return await this.vendorProducts.createQueryBuilder().select().limit(10).getRawMany();
  }
}
