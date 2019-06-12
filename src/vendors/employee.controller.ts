import { Controller, Post, Put, BadRequestException, Param } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { VendorsService } from './services/vendors.service';
import { EmployeeService } from './services/employee.service';
import { BranchesService } from './services/branches.service';
import { newVendorEmployee, updateVendorEmployee } from './dto/employee.dto';

@ApiUseTags(`Vendors Employee`)
@Controller('vendor/employee')
export class EmployeeController{

    constructor(
        private readonly BranchesService : BranchesService,
        private readonly VendorService : VendorsService,
        private readonly EmployeeService : EmployeeService){
    }

    @Post(`:id`)
    async getEmployeeInfo(@Param('id') employeeId : number){

        const employee = await this.EmployeeService.getEmployeeById(employeeId);

        if(!employee){
            throw new BadRequestException('Employee does not exists...')
        }

        const vendor = await this.VendorService.getVendorById(employee.vendor_id);

        if(!vendor){
            throw new BadRequestException('Vendor of employee does not exists...');
        }

        const branch = await this.BranchesService.getBranchById(employee.branch_id);

        if(!branch){
            throw new BadRequestException('Branch of employee does not exists...');
        }

        return { branch : branch, employee : employee, vendor : vendor };
    }
    
    @Post(`create/faker`)
    async createFakeVendorEmployee(){

    }
    
    @Post(`create`)
    async createVendorEmployee( employee : newVendorEmployee){

        const vendor = this.VendorService.getVendorById(employee.vendor_id);
        const branch = this.BranchesService.getBranchById(employee.branch_id);

        if(!vendor){
            throw new BadRequestException('Vendor does not exists..');
        }

        if(!branch){
            throw new BadRequestException('Branch does not exists..');
        }

        return await this.EmployeeService.createEmployee(employee);
    }

    @Put(`update/:id`)
    async updateVendorEmployee(employeeId : number, revision : updateVendorEmployee){

        return await this.EmployeeService.updateEmployee(employeeId, revision);
    }
}