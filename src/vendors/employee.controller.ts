import {
  Controller,
  Post,
  Put,
  BadRequestException,
  Param,
  Get,
  Body,
  Delete,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { VendorsService } from './services/vendors.service';
import { EmployeeService } from './services/employee.service';
import { BranchesService } from './services/branches.service';
import faker = require('faker');
import { NewVendorEmployeeDto, UpdateVendorEmployee } from './dto/employee.dto';
import { searchDto } from '../_commons/commons.dto';
@ApiUseTags('Vendors Employee')
@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly branchesService: BranchesService,
    private readonly vendorService: VendorsService,
    private readonly employeeService: EmployeeService,
  ) {}

  @Get()
  async GetEmployees(@Body() options: searchDto) {
    return this.employeeService.getEmployees(options);
  }

  @Get(':id')
  async getEmployeeInfo(@Param('id') employeeId: number) {
    const employee = await this.employeeService.getEmployeeById(employeeId);
    const vendor = await this.vendorService.getVendorById(employee.vendorId);
    const branch = await this.branchesService.getBranchById(employee.branchId);

    if (!employee) {
      throw new BadRequestException('Employee does not exists...');
    }

    if (!vendor) {
      throw new BadRequestException('Vendor of employee does not exists...');
    }

    if (!branch) {
      throw new BadRequestException('Branch of employee does not exists...');
    }

    return { branch, employee, vendor };
  }
  @Post('create')
  async createEmployee(@Body() employee: NewVendorEmployeeDto) {
    const vendor = await this.vendorService.getVendorById(employee.vendorId);
    const branch = await this.branchesService.getBranchById(employee.branchId);

    if (!vendor) {
      throw new BadRequestException('Vendor does not exists..');
    }
    if (!branch) {
      throw new BadRequestException('Branch does not exists..');
    }
    return await this.employeeService.createEmployee(employee);
  }

  @Post('create/faker')
  async createFakeVendorEmployee() {
    const data = {
      vendorId: faker.random.number(),
      branchId: faker.random.number(),
      businessAddressId: faker.random.number(),
      employeeCode: faker.random.number(),
      employeeName: faker.name.findName(),
      mobileNo: faker.phone.phoneNumberFormat(),
      position: faker.name.jobTitle(),
      commissionToVendor: faker.random.number(),
      overallRating: faker.random.number(),
      isAvailable: faker.random.number(),
      lastUpdated: faker.date.recent(),
      lastUpdatedBy: faker.name.findName(),
      createdBy: faker.name.findName(),
      dateCreated: faker.date.recent(),
    };
    return await this.employeeService.createEmployee(data);
  }

  @Put('update/:id')
  async updateVendorEmployee(
    @Param('id') employeeId: number,
    @Body() revision: UpdateVendorEmployee,
  ) {
    const employee = await this.employeeService.getEmployeeById(employeeId);

    if (!employee) {
      throw new BadRequestException('Employee Id not found.');
    }

    return await this.employeeService.updateEmployee(employeeId, revision);
  }
  @Delete('delete/:id')
  async deleteVendorEmployee(@Param('id') employeeId: number) {
    const employee = await this.employeeService.getEmployeeById(employeeId);

    if (!employee) {
      throw new BadRequestException('Employee Id not found.');
    }

    return await this.employeeService.deleteEmployee(employeeId);
  }
}
