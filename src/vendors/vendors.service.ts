import { Injectable, Inject } from '@nestjs/common';
import { Vendors } from './vendors.entity';
import { Repository } from 'typeorm';
import { CommonQueries } from 'src/_commons/crud.orm';
import { searchDto, primaryIdDto } from 'src/_commons/commons.dto';
import { newVendorDto, updateVendorDto } from './dto/vendor.dto';

@Injectable()
export class VendorsService{

    private searchColumns = [];

    constructor(
        private readonly common : CommonQueries,
        @Inject('VENDOR_REPOSITORY') private readonly vendorRepository : Repository<Vendors>){

        this.common.query(this.vendorRepository)
    }

    async getVendorInfoById(identity : primaryIdDto){

        return await this.vendorRepository.findOne(identity.id);
    }

    async getVendors(options : searchDto){

        const result = await this.common.read(Number(options.limit), Number(options.offset), options.keyword, this.searchColumns);

        return result;        
    }

    async createVendor(vendor : newVendorDto){
        
        const result =  await this.common.create(vendor);

        return result;
    }

    async updateVendor(id : string, revision : updateVendorDto){

        const result = await this.common.update(Number(id), revision);

        return result;        
    }

    async deleteVendor(id : string){

        const result = await this.common.delete(Number(id));

        return result;
    }
}
