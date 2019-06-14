import { Controller, UseGuards, Post, Body, Put, Param, BadRequestException } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { VendorsService } from './/services/vendors.service';
import { searchDto } from 'src/_commons/commons.dto';
import { newVendorDto, updateVendorDto } from './dto/vendor.dto';
import { BranchesService } from './services/branches.service';
import { ProductsService } from './services/products.service';
import voucherCodeGenerator = require('voucher-code-generator');
import moment = require('moment');
import faker = require('faker');
import _ = require('lodash');

@ApiUseTags(`Vendors`)
// @UseGuards(AuthGuard())
// @ApiBearerAuth()
@Controller(`vendors`)
export class VendorsController{

    constructor(
        private readonly ProductService : ProductsService,
        private readonly BranchesService : BranchesService,
        private readonly VendorService : VendorsService){
    }

    @Post()
    async getVendors(@Body() options : searchDto){
    
        return await this.VendorService.getVendors(options);
    }

    @Post(`:id`)
    async getVendorInformation(@Param('id') vendorId : number){

        return await this.VendorService.getVendorById(vendorId);
    }    

    @Post(`:id/employees`)
    async getVendorEmployees(@Param(`id`) vendorId : number, @Body() options : searchDto){

    }
    
    @Post(`:id/branches`)
    async getVendorBranches(@Param(`id`) vendorId : number, @Body() options : searchDto){

        const vendor = await this.VendorService.getVendorById(vendorId);
    
        if(vendor){

            const branches = await this.BranchesService.getBranchesByVendorId(vendorId, options);

            return { branches : branches, vendor : vendor };
        }

        throw new BadRequestException('Vendor not found..');
    }

    @Post(':id/products')
    async getVendorProducts(@Param(`id`) vendorId : number, @Body() options : searchDto){

        const vendor = await this.VendorService.getVendorById(vendorId);
        
        if(vendor){

            const products = await this.ProductService.getProductsByVendorId(vendorId, options);
        
            return { vendor : vendor, products : products };
        }

        throw new BadRequestException('Vendor not found..');
    }

    @Post(`create`)
    async createVendor(@Body() vendor : newVendorDto){

        const _vendor = await this.VendorService.createVendor(vendor);

        return { payload : _vendor.generatedMaps, raw : _vendor.raw };
    }

    @Put(`update/:id`)
    async updateVendor(@Param(`id`) vendorId : number, @Body() revisions : updateVendorDto){

        const _vendor = await this.VendorService.updateVendor(vendorId, revisions);

        return { payload : _vendor.generatedMaps, raw : _vendor.raw };
    }

    @Post('create/faker')
    async seedVendor(){

        _.times(100, async () => {

            let fakeVendor : newVendorDto = {
                "name": faker.company.companyName(),
                "description": faker.company.catchPhrase(),
                "email": faker.internet.email(),
                "days_open" : ["Mon"],
                "mobile_no": faker.phone.phoneNumberFormat().replace("-", ""),
                "telephone_no": null,
                "open_hours": "08:00",
                "address": `${faker.address.streetAddress()} ${faker.address.streetName()} ${faker.address.zipCode()}`,
                "city": faker.address.city(),
                "business_type": faker.company.bs()
            }

            fakeVendor[`code`] = voucherCodeGenerator.generate({
                length     : 5,
                count      : 1,
                pattern    : `#####`,
                characters : voucherCodeGenerator.charset(`alphabetic`),
                prefix     : `VND`,
                suffix : moment().format(`YYYY`).toString()
            })[0];
    
            await this.VendorService.createVendor(fakeVendor);
        });
    }
}