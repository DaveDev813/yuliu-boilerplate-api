import { Controller, Post, Body, Param, BadRequestException, Put } from '@nestjs/common';
import { VendorsService } from './services/vendors.service';
import { BranchesService } from './services/branches.service';
import { newVendorProduct, updateVendorProductDto } from './dto/products';
import { ProductsService } from './services/products.service';
import { searchDto } from 'src/_commons/commons.dto';
import voucherCodeGenerator = require('voucher-code-generator');
import moment = require('moment');
import faker = require('faker');
import _ = require('lodash');
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags(`Vendors Products`)
@Controller('vendor/products')
export class ProductsController{

    constructor(
        private readonly productService : ProductsService,
        private readonly branchesService : BranchesService,
        private readonly vendorsService : VendorsService){
    }

    @Post()
    async getProducts(options : searchDto){

        return await this.productService.getProducts(options);
    }

    @Post('create')
    async createVendorProduct(@Body() product : newVendorProduct){

        // const vendor = await this.vendorsService.getVendorById(product.vendor_id);

        // const branch = await this.branchesService.getBranchById(product.branch_id);

        // const branches = await this.branchesService.getBranchBy({ vendor_id : product.vendor_id });

        // if(!vendor){ throw new BadRequestException(`Vendor is does not exists..`); }

        // if(vendor.vendor_status === `Disabled`){ throw new BadRequestException(`Vendor is no longer active..`); }

        // if(!branches){ throw new BadRequestException(`No branches available in this vendor..`); }

        // if(!branches.filter( branch => branch.id == product.branch_id)){ throw new BadRequestException(`This branch does not belong to this vendor..`); }

        // if(!branch){ throw new BadRequestException(`Branch does not exists..`); }

        // if(branch.branch_status === `Disabled`){ throw new BadRequestException(`Branch is no longer active..`); }

        const _result = await this.productService.createVendorProduct(product);

        return { payload : _result.generatedMaps, raw : _result.raw };
    }

    @Post('create/faker')
    async createFakeVendorProduct(){

        _.times(100, async () => {

            let fakeData : newVendorProduct = {
                "branch_id": 1,
                "name": faker.company.catchPhrase(),
                "description": "",
                "product_type" : `Service`,
                "duration": null,
                "product_cost": 600.60,
                "product_price": 115.00,
                "product_comission": 5.50,
            }
            fakeData[`created_by`] = 1;
            fakeData[`product_code`] = voucherCodeGenerator.generate({
                length     : 5,
                count      : 1,
                pattern    : `#####`,
                characters : voucherCodeGenerator.charset(`alphabetic`),
                prefix     : `VND`,
                suffix : moment().format(`YYYY`).toString()
            })[0];
    
           await this.productService.createVendorProduct(fakeData);
        });
    }

    @Put('update/:id')
    async updateVendorProduct(@Param(`id`) productId : number, @Body() revisions : updateVendorProductDto){

        const product = await this.productService.getProductInfo(productId);

        if(!product){ throw new BadRequestException(`Product does not exists..`); }
        
        const _result = await this.productService.updateVendorProduct(productId, revisions);

        return { payload : _result.generatedMaps, raw : _result.raw };
    }
}
