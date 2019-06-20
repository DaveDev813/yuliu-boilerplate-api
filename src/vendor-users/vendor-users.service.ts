import { Injectable, Inject } from '@nestjs/common';
import { primaryIdDto, searchDto } from 'src/_commons/commons.dto';
import { newVendorUserDto, updateVendorUserDto } from './dto/vendor-users.dto';
import { CommonQueries } from 'src/_commons/commons.orm';
import { VendorUsers } from './vendor-users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VendorUsersService {
  constructor(
    private readonly common: CommonQueries,
    @Inject('VENDOR_USER_REPOSITORY')
    private readonly vendorUserRepository: Repository<VendorUsers>,
  ) {
    this.common.query(this.vendorUserRepository);
  }

  async getVendorUserInfoById(identity: primaryIdDto) {
    return await this.vendorUserRepository.findOne(identity.id);
  }

  async getVendorUsers(options: searchDto) {
    const result = await this.common.read(options);

    return result;
  }

  async createVendor(vendorUser: newVendorUserDto) {
    const result = await this.common.create(vendorUser);

    return result;
  }

  async updateVendor(id: string, revision: updateVendorUserDto) {
    const result = await this.common.update(Number(id), revision);

    return result;
  }

  async deleteVendorUser(id: string) {
    const result = await this.common.delete(Number(id));

    return result;
  }
}
