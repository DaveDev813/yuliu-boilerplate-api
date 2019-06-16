import { Injectable, Inject } from '@nestjs/common';
import { VendorEmployees } from '../entities/vendors.entity';
import { Repository } from 'typeorm';
import { VendorsService } from './vendors.service';
import { BranchesService } from './branches.service';
import { searchDto } from 'src/_commons/commons.dto';
import {
  NewVendorEmployeeDto,
  UpdateVendorEmployee,
} from '../dto/employee.dto';
import { CommonQueries } from 'src/_commons/commons.orm';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly common: CommonQueries,
    private readonly VendorService: VendorsService,
    private readonly BranchService: BranchesService,
    @Inject('VENDOR_EMPLOYEE_REPOSITORY')
    private readonly VENDOR_EMPLOYEE_REPOSITORY: Repository<VendorEmployees>,
  ) {
    this.common.query(this.VENDOR_EMPLOYEE_REPOSITORY);
  }

  async getEmployees() {
    return await this.common.read(0, 1, '');
  }

  async createEmployee(employee: NewVendorEmployeeDto) {
    return await this.common.insert(employee);
  }

  async getEmployeeById(employeeId: number) {
    return await this.VENDOR_EMPLOYEE_REPOSITORY.findOne(employeeId);
  }
  async updateEmployee(employeeId: number, revisions: UpdateVendorEmployee) {
    return await this.common.update(employeeId, revisions);
  }

  async deleteEmployee(employeeId: number) {
    return this.common.delete(employeeId);
  }

  async getEmployeeByVendorId(vendorId: number, options: searchDto) {}

  async getEmloyeeByBranchId(branchId: number, options: searchDto) {}
}
