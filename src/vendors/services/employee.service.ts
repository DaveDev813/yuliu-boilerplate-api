import { Injectable, Inject } from '@nestjs/common';
import { VendorEmployees } from '../entities/vendors.entity';
import { Repository } from 'typeorm';
import { VendorsService } from './vendors.service';
import { BranchesService } from './branches.service';
import { searchDto } from 'src/_commons/commons.dto';
import { newVendorEmployee, updateVendorEmployee } from '../dto/employee.dto';
import { CommonQueries } from 'src/_commons/commons.orm';

@Injectable()
export class EmployeeService{

    constructor(
        private readonly common : CommonQueries,
        private readonly VendorService : VendorsService,
        private readonly BranchService : BranchesService,
        @Inject('VENDOR_EMPLOYEE_REPOSITORY') private readonly VENDOR_EMPLOYEE_REPOSITORY : Repository<VendorEmployees>,
    ){

    }

    async getEmployeeById(employeeId : number){

        return await this.VENDOR_EMPLOYEE_REPOSITORY.findOne(employeeId);
    }

    async getEmployees(options : searchDto){

    }

    async getEmployeeByVendorId(vendorId : number, options : searchDto){

    }

    async getEmloyeeByBranchId(branchId : number, options : searchDto){

    }

    async createEmployee(employee : newVendorEmployee){

        return await this.common.query(this.VENDOR_EMPLOYEE_REPOSITORY).insert(employee);
    }

    async updateEmployee(employeeId : number, revisions : updateVendorEmployee){

    }
}