import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CommonQueries } from 'src/_commons/commons.orm';
import { searchDto, primaryIdDto } from 'src/_commons/commons.dto';
import { NewVendorDto, UpdateVendorDto } from '../dto/vendor.dto';
import { Vendors } from '../entities/vendors.entity';
import voucherCodeGenerator = require('voucher-code-generator');
import moment = require('moment');

@Injectable()
export class VendorsService {
  // tslint:disable-next-line:variable-name
  private search_columns = ['name', 'description', 'business_type', 'email'];

  constructor(
    private readonly common: CommonQueries,
    @Inject('VENDOR_REPOSITORY')
    private readonly VENDOR_REPOSITORY: Repository<Vendors>,
  ) {
    this.common.query(this.VENDOR_REPOSITORY);
  }

  async isUserFromVendor(user: number, vendor: number) {
    return true;
  }

  async isValidAction(user: number) {
    return true;
  }

  async getVendorById(vendorId: number) {
    return await this.VENDOR_REPOSITORY.findOne(vendorId);
  }

  async getVendors(options: searchDto) {
    const query = await this.VENDOR_REPOSITORY.createQueryBuilder().select();

    if (options.keyword) {
      this.search_columns.forEach((column, i) => {
        if (!i) {
          query.where(`${column} LIKE :key`, { key: `%${options.keyword}%` });
        } else {
          query.orWhere(`${column} LIKE :key`, { key: `%${options.keyword}%` });
        }
      });
    }

    const rows: Vendors[] = await query
      .limit(options.limit)
      .offset(options.limit * options.offset)
      .getMany();

    const total: number = await query.getCount();

    return {
      rows,
      total,
      offset: options.offset,
      keyword: options.keyword ? options.keyword : null,
    };
  }

  async createVendor(vendor: NewVendorDto) {
    const createdBy = 1;

    // tslint:disable-next-line:variable-name
    const _vendor = {
      code: voucherCodeGenerator.generate({
        length: 5,
        count: 1,
        pattern: `#####`,
        prefix: `VENDOR-`,
      })[0],
      name: vendor.name,
      description: vendor.description ? vendor.description : null,
      email: vendor.email,
      mobileNo: vendor.mobileNo,
      telephoneNo: vendor.telephoneNo ? vendor.telephoneNo : null,
      daysOpen: vendor.daysOpen ? vendor.daysOpen.join(',') : null,
      daysClosed: vendor.daysOpen
        ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            .filter(day => vendor.daysOpen.indexOf(day) <= -1)
            .join(',')
        : null,
      openHours: vendor.openHours ? vendor.openHours : null,
      closedHours: vendor.openHours
        ? moment(vendor.openHours, 'HH:mm')
            .add(8, 'hours')
            .format('HH:mm')
        : null,
      address: vendor.address,
      city: vendor.city,
      business_type: vendor.businessType,
      vendor_status: 'Deactivated',
      account_type: 'Free',
      created_by: createdBy,
    };

    // tslint:disable-next-line:variable-name
    const _result = await this.VENDOR_REPOSITORY.insert(_vendor);

    // _result.payload = _vendor;

    return _result;
  }

  async updateVendor(vendorId: number, revisions: UpdateVendorDto) {
    const changes: any = revisions;

    if (revisions.daysOpen) {
      changes.daysOpen = revisions.daysOpen.join(',');
      revisions.daysClosed = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        .filter(day => revisions.daysOpen.indexOf(day) <= -1)
        .join(',');
    }

    if (revisions.openHours) {
      changes.closedHours = moment(revisions.openHours, 'HH:mm')
        .add(8, 'hours')
        .format('HH:mm');
    }

    // tslint:disable-next-line:variable-name
    const _result = await this.common
      .query(this.VENDOR_REPOSITORY)
      .update(vendorId, changes);

    return _result;
  }
}
