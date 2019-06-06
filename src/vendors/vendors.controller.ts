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
                "mobile_no": faker.phone.phoneNumberFormat().replace("-", ""),
                "telephone_no": voucherCodeGenerator.generate({ length : 7, charset : '0123456789' })[0],
                "days_open": "Mon, Tue, Wed, Thu, Fri",
                "days_closed" : "Sat, Sun",
                "open_hours": "08:00",
                "closed_hours": "20:00",
                "address": `${faker.address.streetAddress()} ${faker.address.streetName()} ${faker.address.zipCode()}`,
                "city": faker.address.city(),
                "business_type": faker.company.bs(),
                "account_type": "Free",
                "created_by": 1
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

        vendor[`code`] = voucherCodeGenerator.generate({
            length     : 5,
            count      : 1,
            pattern    : `#####`,
            characters : voucherCodeGenerator.charset(`alphabetic`),
            prefix     : `VND`,
            suffix : moment().format(`YYYY`).toString()
        })[0];

        return await this.vendorsService.createVendor(vendor);
    }

    @Put(`update/:id`)
    async updateVendor(@Param(`id`) id : string, @Body() revisions : updateVendorDto){
        return await this.vendorsService.updateVendor(id, revisions);
    }

    @Post()
    async getVendors(@Body() options : searchDto){
        return await this.vendorsService.getVendors(options);
    }

    @Post(`:id`)
    async getVendorInfo(@Body(`id`) identity : primaryIdDto){
        return await this.vendorsService.getVendorInfoById(identity);
    }

}


