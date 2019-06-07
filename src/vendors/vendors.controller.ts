import { Controller, UseGuards, Post, Body, Put, Param, BadRequestException } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { VendorsService } from './/services/vendors.service';
import { searchDto, primaryIdDto } from 'src/_commons/commons.dto';
import { newVendorDto, updateVendorDto } from './dto/vendor.dto';
import voucherCodeGenerator = require('voucher-code-generator');
import moment = require('moment');
import faker = require('faker');
import _ = require('lodash');

@ApiUseTags(`Vendors`)
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller(`vendors`)
export class VendorsController{

    constructor(
        private readonly vendorsService : VendorsService){
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
    
            await this.vendorsService.createVendor(fakeVendor);
        });
    }

    @Post(`create`)
    async createVendor(@Body() vendor : newVendorDto){

        /** Apply additional validation here */

        const _vendor = await this.vendorsService.createVendor(vendor);

        /** Apply business logic here */

        return { payload : _vendor.generatedMaps, raw : _vendor.raw };
    }

    @Put(`update/:id`)
    async updateVendor(@Param(`id`) id : string, @Body() revisions : updateVendorDto){

        /** Apply additional validation here */

        const _vendor = await this.vendorsService.updateVendor(id, revisions);

        /** Apply business logic here */

        return { payload : _vendor.generatedMaps, raw : _vendor.raw };
    }

    @Post()
    async getVendors(@Body() options : searchDto){

        return await this.vendorsService.getVendors(options);
    }

    @Post(`:id`)
    async getVendorInfo(@Param('id') id : number){

        return await this.vendorsService.getVendorInfoById({ id : id });
    }
}


