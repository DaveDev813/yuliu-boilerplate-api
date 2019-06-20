import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CommonQueries } from 'src/_commons/commons.orm';
import { Repository } from 'typeorm';
import { VendorBranches } from '../entities/vendors.entity';
import { NewVendorBranchDto, UpdateVendorBranchDto } from '../dto/branches.dto';
import { searchDto } from 'src/_commons/commons.dto';
import voucherCodeGenerator = require('voucher-code-generator');
import moment = require('moment');

@Injectable()
export class BranchesService {
  // tslint:disable-next-line:variable-name
  private search_columns = ['branchCode', 'contactPerson', 'city', 'address'];

  constructor(
    private readonly common: CommonQueries,
    @Inject('VENDOR_BRANCH_REPOSITORY')
    private readonly vendorBranchRepository: Repository<VendorBranches>, // private readonly vendorsService: VendorsService,
  ) {
    this.common.query(this.vendorBranchRepository);
  }

  async getBranchesByVendorId(vendorId: number, options: searchDto) {
    const query = this.vendorBranchRepository.createQueryBuilder().select();

    if (options.keyword) {
      this.search_columns.forEach((col, i) => {
        if (!i) {
          query.where(`${col} LIKE :key`, { key: `%${options.keyword}%` });
        } else {
          query.orWhere(`${col} LIKE :key`, { key: `%${options.keyword}%` });
        }
      });
    }

    query.andWhere(`vendor_id = :vendor`, { vendor: vendorId });

    const total: number = await query.getCount();
    const rows: VendorBranches[] = await query
      .limit(options.limit)
      .offset(options.limit * options.offset)
      .getMany();

    return {
      rows,
      total,
      offset: options.offset,
      keyword: options.keyword ? options.keyword : null,
    };
  }
  async getBranches(options: searchDto, conditions?: () => {}) {
    // tslint:disable-next-line:variable-name
    const search_columns = ['branchCode', 'contactPerson', 'city', 'address'];

    const result = await this.common
      .query(this.vendorBranchRepository)
      .read(options, search_columns);

    return result;
  }

  async getBranchById(branchId: number) {
    return await this.vendorBranchRepository.findOne({ id: branchId });
  }

  async getBranchByCode(branchCode: string) {
    return await this.vendorBranchRepository.findOne({
      branchCode,
    });
  }

  async getBranchBy(conditions: { [key: string]: any }) {
    return await this.vendorBranchRepository.find(conditions);
  }

  async createBranch(branch: NewVendorBranchDto) {
    const create = {
      vendorId: branch.vendorId,
      branchCode: voucherCodeGenerator.generate({
        length: 5,
        count: 1,
        pattern: `#####`,
        prefix: `BRANCH-`,
      })[0],
      contactPerson: branch.contactPerson,
      mobileNo: branch.mobileNo,
      telephoneNo: branch.telephoneNo ? branch.telephoneNo : null,
      daysOpen: branch.daysOpen ? branch.daysOpen.join(',') : null,
      daysClosed: branch.daysOpen
        ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            .filter(day => branch.daysOpen.indexOf(day) <= -1)
            .join(',')
        : null,
      openHours: branch.openHours ? branch.openHours : null,
      closedHours: branch.openHours
        ? moment(branch.openHours, `HH:mm`)
            .add(8, 'hours')
            .format(`HH:mm`)
        : null,
      address: branch.address,
      city: branch.city,
      branchStatus: branch.branchStatus,
    };

    return await this.common.query(this.vendorBranchRepository).insert(create);
  }

  async updateVendorBranch(branchId: number, revisions: UpdateVendorBranchDto) {
    const branchData: any = revisions;

    if (branchData.daysOpen) {
      branchData.daysClosed = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        .filter(day => branchData.daysOpen.indexOf(day) <= -1)
        .join(',');
      branchData.daysOpen = branchData.daysOpen.join(',');
    }

    if (branchData.openHours) {
      branchData.closedHours = moment(revisions.openHours, 'HH:mm')
        .add(8, 'hours')
        .format('HH:mm');
    }

    // tslint:disable-next-line:variable-name
    return await this.common
      .query(this.vendorBranchRepository)
      .update(Number(branchId), branchData);
    // _result.payload = _branch;
    // return _result;
  }

  // async isValid(vendorId: number, requestorId: number) {
  //   const vendor_info = await this.vendorsService.getVendorById(vendorId);

  //   if (!vendor_info) {
  //     return { error: true, message: `Business does not exists...` };
  //   }

  //   if (vendor_info.vendor_status !== `Active`) {
  //     return { error: true, message: `Business is no longer available...` };
  //   }

  //   if (this.vendorsService.isUserFromVendor(requestorId, vendorId)) {
  //     return {
  //       error: true,
  //       message: `Creator does is not allowed to make changes to this vendor`,
  //     };
  //   }

  //   /** Check if the user is allowed to do such things.. */
  //   if (!this.vendorsService.isValidAction(requestorId)) {
  //     return {
  //       error: true,
  //       message: `User is don't have enough permissions...`,
  //     };
  //   }

  //   return { error: false, message: `` };
  // }
}
