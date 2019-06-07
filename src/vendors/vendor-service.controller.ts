import { Controller, Param, Body, Post } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { VendorsService } from './services/vendors.service';
import { BranchesService } from './services/branches.service';
import { searchDto } from 'src/_commons/commons.dto';
import { updateVendorServiceDto, newVendorServiceDto } from './dto/services.dto';

@ApiUseTags(`Vendors Services`)
@Controller('vendor/services')
export class VendorServiceController{

    constructor(
        private readonly vendorService : VendorsService,
        private readonly branchesService : BranchesService){
    }
    
    @Post('create')
    async createVendorService(@Body() service : newVendorServiceDto){

    }

    @Post('create/faker')
    async createFakeVendorService(){

    }

    @Post('update/:id')
    async updateVendorService(@Param(`id`) vendorId, @Body() revision : updateVendorServiceDto){

    }

    

}
