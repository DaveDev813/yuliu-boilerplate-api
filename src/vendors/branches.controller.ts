import { Controller, Post, Param, Body, Put, BadRequestException } from '@nestjs/common';
import { searchDto } from 'src/_commons/commons.dto';
import { newVendorBranchDto, updateVendorBranchDto } from './dto/branches.dto';
import { BranchesService } from './services/branches.service';
import moment = require('moment');
import voucherCodeGenerator = require('voucher-code-generator');
import { ApiUseTags } from '@nestjs/swagger';
import { VendorsService } from './services/vendors.service';
import faker = require('faker');
import _ = require('lodash');

@ApiUseTags(`Vendors Branches`)
@Controller('vendor/branches')
export class BranchesController{

    constructor(
        private readonly vendorService : VendorsService,
        private readonly branchesService : BranchesService){
    }

    @Post(`branch/:id`)
    async getBranchById(@Param(`id`) branchId : number){

        return await this.branchesService.getBranchById(branchId);
    }

    @Post(`:id/branches`)
    async getVendorBranches(@Param(`id`) vendorId : number, @Body() options : searchDto){

        return await this.branchesService.getBranchesByVendorId(vendorId, options);
    }

    @Post(`create`)
    async createBusinessBranch(@Body() branch : newVendorBranchDto){   

        const vendor = await this.vendorService.getVendorInfoById({ id : branch.vendor_id });

        if(vendor){
            throw new BadRequestException('Invalid Vendor ID..');
        }

        if(vendor.vendor_status === `Disabled`){
            throw new BadRequestException('Vendor is not active..');
        }

        const _result = await this.branchesService.createBranch(branch);

        return { payload : _result.generatedMaps, raw : _result.raw };
    }

    @Post(`create/faker`)
    async createFakeBraches(){

        _.times( 100, async () => {

            const fakeBranch = {
                vendor_id : faker.random.number(),
                branch_code : voucherCodeGenerator.generate({ length : 5, count : 1, pattern : `#####`, prefix : `BRANCH-` })[0],
                contact_person : faker.name.findName(),
                mobile_no : faker.phone.phoneNumberFormat(),
                telephone_no : faker.phone.phoneNumberFormat(),
                days_open : ['Mon','Wed','Tue','Fri'],
                open_hours : "21:00",
                address :`${faker.address.streetAddress()} ${faker.address.streetName()} ${faker.address.zipCode()}`,
                city : faker.address.city(),
                created_by : 1
            };

            await this.branchesService.createBranch(fakeBranch);
        });
    }    

    @Put(`update/:id`)
    async updateBusinessbranch(@Param(`id`) id : number, @Body() revisions : updateVendorBranchDto){

        if(revisions.vendor_id){

            const vendor = await this.vendorService.getVendorInfoById({ id : revisions.vendor_id });

            if(vendor){
                throw new BadRequestException('Invalid Vendor ID..');
            }

            if(vendor.vendor_status === `Disabled`){
                throw new BadRequestException('Vendor is not active..');
            }
        }

        /** Apply additional validation here */

        const _vendor = await this.branchesService.updateVendorBranch(id, revisions);

        /** Apply business logic here */

        return { payload : _vendor.generatedMaps, raw : _vendor.raw };

    }
}
