import { Controller, UseGuards, Post, Body, Put, Param } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { VendorsService } from './vendors.service';
import { searchDto, primaryIdDto } from 'src/_commons/commons.dto';
import { ProductsService } from 'src/products/products.service';
import { newVendorDto, updateVendorDto } from './dto/vendor.dto';

@ApiUseTags('Products')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('vendors')
export class VendorsController{

    constructor(
        private readonly vendorsService : VendorsService,
        private readonly productService : ProductsService){}

    @Post(':id')
    async getVendorInfo(@Body('id') identity : primaryIdDto){

        return await this.vendorsService.getVendorInfoById(identity);
    }

    @Post()
    async getVendors(@Body() options : searchDto){

        return await this.vendorsService.getVendors(options);
    }

    @Post('create')
    async createVendor(@Body() vendor : newVendorDto){

        return await this.vendorsService.createVendor(vendor);
    }

    @Put('update/:id')
    async updateVendor(@Param('id') id : string, @Body() revisions : updateVendorDto){
        
        return await this.vendorsService.updateVendor(id, revisions);
    }
}
