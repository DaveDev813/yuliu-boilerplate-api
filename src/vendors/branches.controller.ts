import {
  Controller,
  Post,
  Param,
  Body,
  Put,
  BadRequestException,
  Get,
  UseGuards,
} from '@nestjs/common';
import { searchDto } from 'src/_commons/commons.dto';
import { NewVendorBranchDto, UpdateVendorBranchDto } from './dto/branches.dto';
import { BranchesService } from './services/branches.service';
import moment = require('moment');
import voucherCodeGenerator = require('voucher-code-generator');
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { VendorsService } from './services/vendors.service';
import faker = require('faker');
import _ = require('lodash');
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('Vendors Branches')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('branches')
export class BranchesController {
  constructor(
    private readonly vendorService: VendorsService,
    private readonly branchesService: BranchesService,
  ) {}

  @Post()
  async getBranches(@Body() options: searchDto) {
    return await this.branchesService.getBranches(options);
  }

  @Get(':id')
  async getBranchInfo(@Param('id') branchId: number) {
    /**
     * @TODO
     * INCLUDE THE VENDOR INFORMATION IN THE PAYLOAD
     */

    return await this.branchesService.getBranchById(branchId);
  }

  @Post('create')
  async createBranch(
    @Param('vendorId') vendorId,
    @Body() branch: NewVendorBranchDto,
  ) {
    const vendor = await this.vendorService.getVendorById(branch.vendorId);

    if (!vendor) {
      return {
        error: { description: 'Invalid Vendor Id' },
      };
    }

    if (vendor.vendorStatus === `Disabled`) {
      return {
        error: { description: 'Vendor is not Active' },
      };
    }

    const newBranch = await this.branchesService.createBranch(branch);

    return {
      data: { branchId: newBranch.raw.insertId },
    };
  }

  @Post('create/faker')
  async createFakeBraches() {
    _.times(100, async () => {
      const fakeBranch = {
        vendorId: faker.random.number(),
        branchCode: voucherCodeGenerator.generate({
          length: 5,
          count: 1,
          pattern: `#####`,
          prefix: `BRANCH-`,
        })[0],
        contactPerson: faker.name.findName(),
        mobileNo: faker.phone.phoneNumberFormat(),
        telephoneNo: faker.phone.phoneNumberFormat(),
        daysOpen: ['Mon', 'Wed', 'Tue', 'Fri'],
        openHours: '08:00',
        closedHours: '20:00',
        address: `${faker.address.streetAddress()} ${faker.address.streetName()} ${faker.address.zipCode()}`,
        city: faker.address.city(),
        branchStatus: 'Enabled',
      };

      await this.branchesService.createBranch(fakeBranch);
    });
  }

  @Put('update/:id')
  async updateBranch(
    @Param('id') branchId: number,
    @Body() revisions: UpdateVendorBranchDto,
  ) {
    const vendor = await this.vendorService.getVendorById(revisions.vendorId);

    if (!vendor) {
      return {
        error: { description: 'Invalid Vendor Id' },
      };
    }

    if (vendor.vendorStatus === 'Disabled') {
      return {
        error: { description: 'Vendor is not active' },
      };
    }

    await this.branchesService.updateVendorBranch(branchId, revisions);

    return await this.branchesService.getBranchById(branchId);
  }
}
