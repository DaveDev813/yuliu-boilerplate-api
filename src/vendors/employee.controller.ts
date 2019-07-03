import {
  Controller,
  Post,
  Put,
  BadRequestException,
  Param,
  Get,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { VendorsService } from './services/vendors.service';
import { EmployeeService } from './services/employee.service';
import { BranchesService } from './services/branches.service';
import faker = require('faker');
import { NewVendorEmployeeDto, UpdateVendorEmployee } from './dto/employee.dto';
import { searchDto } from '../_commons/commons.dto';
import { AuthGuard } from '@nestjs/passport';

//@ApiUseTags('Vendors Employee')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly branchesService: BranchesService,
    private readonly vendorService: VendorsService,
    private readonly employeeService: EmployeeService,
  ) {}


  @Post()
  async GetEmployees(@Body() options: searchDto) {
    return this.employeeService.getEmployees(options);
  }

  @Get(':id')
  async getEmployeeInfo(@Param('id') employeeId: number) {
    const employee = await this.employeeService.getEmployeeById(employeeId);
    const vendor = await this.vendorService.getVendorById(employee.vendorId);
    const branch = await this.branchesService.getBranchById(employee.branchId);

    if (!employee) {
      return {
        error: { description: 'Employee Not Found' },
      };
    }

    if (!vendor) {
      return {
        error: { description: 'Vendor Not Found' },
      };
    }

    if (!branch) {
      return {
        error: { description: 'Branch Not Found' },
      };
    }

    return employee;
  }
  @Post('create')
  async createEmployee(@Body() employee: NewVendorEmployeeDto) {
    const vendor = await this.vendorService.getVendorById(employee.vendorId);
    const branch = await this.branchesService.getBranchById(employee.branchId);

    if (!vendor) {
      return {
        error: { description: 'Vendor Not Found' },
      };
    }

    if (!branch) {
      return {
        error: { description: 'Branch Not Found' },
      };
    }

    const newEmployee = await this.employeeService.createEmployee(employee);

    return {
      data: { employeeId: newEmployee.raw.insertId },
    };
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

    await this.employeeService.updateEmployee(employeeId, revision);

    return await this.employeeService.getEmployeeById(employeeId);
  }
  @Delete('delete/:id')
  async deleteVendorEmployee(@Param('id') employeeId: number) {
    const employee = await this.employeeService.getEmployeeById(employeeId);

    if (!employee) {
      return {
        error: { description: 'No Employee Found' },
      };
    }

    return await this.employeeService.deleteEmployee(employeeId);
  }
}
