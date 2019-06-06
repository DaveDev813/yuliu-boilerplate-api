import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CommonQueries } from 'src/_commons/commons.orm';
import { searchDto, primaryIdDto } from 'src/_commons/commons.dto';
import { newVendorDto, updateVendorDto } from '../dto/vendor.dto';
import { Vendors } from '../entities/vendors.entity';

@Injectable()
export class VendorsService{

    private searchColumns = ['name', 'description', 'business_type', 'email'];

    constructor(
        private readonly common : CommonQueries,
        @Inject('VENDOR_REPOSITORY') private readonly vendorRepository : Repository<Vendors>){

        this.common.query(this.vendorRepository)
    }

    async isUserFromVendor(user : number, vendor : number){
        return true;
    }

    async isValidAction(user : number){
        return true;
    }

    async getVendorInfoById(identity : primaryIdDto){

        return await this.vendorRepository.findOne(identity.id);
    }

    async getVendors(options : searchDto){

        const result = await this.common.read(Number(options.limit), Number(options.offset), options.keyword, this.searchColumns);

        return result;        
    }

    async createVendor(vendor : newVendorDto){

        /** Checks if valid phone number */
         
        return await this.common.insert(vendor);
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
