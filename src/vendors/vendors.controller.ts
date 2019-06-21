import {
  Controller,
  UseGuards,
  Post,
  Body,
  Put,
  Param,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { VendorsService } from './/services/vendors.service';
import { searchDto } from 'src/_commons/commons.dto';
import { NewVendorDto, UpdateVendorDto } from './dto/vendor.dto';
import { BranchesService } from './services/branches.service';
import { ProductsService } from './services/products.service';
import voucherCodeGenerator = require('voucher-code-generator');
import moment = require('moment');
import faker = require('faker');
import _ = require('lodash');
import { EmployeeService } from './services/employee.service';

@ApiUseTags(`Vendors`)
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller(`vendors`)
export class VendorsController {
  constructor(
    private readonly productService: ProductsService,
    private readonly branchesService: BranchesService,
    private readonly vendorService: VendorsService,
    private readonly employeeService: EmployeeService,
  ) {}

  @Post()
  async getVendors(@Body() options: searchDto) {
    return await this.vendorService.getVendors(options);
  }

  @Get(':id')
  async getVendorInformation(@Param('id') vendorId: number) {
    const vendor = await this.vendorService.getVendorById(vendorId);

    if (!vendor) {
      return {
        error: { description: 'No Vendor Found' },
      };
    }

    return vendor;
  }

  @Post(':id/employees') // Retrieve all Employees in one vendor
  async getVendorEmployees(
    @Param('id') vendorId: number,
    @Body() options: searchDto,
  ) {
    const vendor = await this.vendorService.getVendorById(vendorId);

    if (!vendor) {
      return {
        error: {
          description: 'No Vendor Found',
        },
      };
    }

    const employees = await this.employeeService.getEmployees(options);
    return {
      data: employees,
    };
  }

  @Get(':vendorId/employee/:employeeId')
  async getVendorEmployee(
    @Param('vendorId') vendorId: number,
    @Param('employeeId') employeeId: number,
  ) {
    const vendor = await this.vendorService.getVendorById(vendorId);
    const employee = await this.employeeService.getEmployeeById(employeeId);

    if (!vendor) {
      return {
        error: { description: 'No Vendor Found' },
      };
    }
    if (!employee) {
      return {
        error: { description: 'No Employee Found' },
      };
    }

    return employee;
  }

  @Post(':id/branches')
  async getVendorBranches(
    @Param('id') vendorId: number,
    @Body() options: searchDto,
  ) {
    const vendor = await this.vendorService.getVendorById(vendorId);

    if (!vendor) {
      return {
        error: { description: 'Vendor not found' },
      };
    }
    const branches = await this.branchesService.getBranches(options);

    return {
      data: branches,
    };
  }

  @Post(':id/products')
  async getVendorProducts(
    @Param('id') vendorId: number,
    @Body() options: searchDto,
  ) {
    const vendor = await this.vendorService.getVendorById(vendorId);

    if (!vendor) {
      return {
        error: { description: 'No Vendor found' },
      };
    }
    const products = await this.productService.getProducts(options);

    return {
      data: products,
    };
  }

  @Post(`create`)
  async createVendor(@Body() vendor: NewVendorDto) {
    const newVendor = await this.vendorService.createVendor(vendor);

    return {
      data: { vendorId: newVendor.raw.insertId },
    };
    // return { payload: vendorData.generatedMaps, raw: vendorData.raw };
  }

  @Put('update/:id')
  async updateVendor(
    @Param('id') vendorId: number,
    @Body() revisions: UpdateVendorDto,
  ) {
    const vendor = await this.vendorService.getVendorById(vendorId);

    if (!vendor) {
      return {
        error: { description: 'No vendor found' },
      };
    }
    await this.vendorService.updateVendor(vendorId, revisions);

    return await this.vendorService.getVendorById(vendorId);
  }

  @Post('create/faker')
  async seedVendor() {
    _.times(100, async () => {
      const fakeVendor: NewVendorDto = {
        name: faker.company.companyName(),
        description: faker.company.catchPhrase(),
        email: faker.internet.email(),
        daysOpen: ['Mon'],
        mobileNo: faker.phone.phoneNumberFormat().replace('-', ''),
        telephoneNo: null,
        openHours: '08:00',
        address: `${faker.address.streetAddress()} ${faker.address.streetName()} ${faker.address.zipCode()}`,
        city: faker.address.city(),
        businessType: faker.company.bs(),
      };

      fakeVendor[`code`] = voucherCodeGenerator.generate({
        length: 5,
        count: 1,
        pattern: `#####`,
        characters: voucherCodeGenerator.charset(`alphabetic`),
        prefix: `VND`,
        suffix: moment()
          .format(`YYYY`)
          .toString(),
      })[0];

      await this.vendorService.createVendor(fakeVendor);
    });
  }
}
