import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CommonQueries } from 'src/_commons/commons.orm';
import { Repository } from 'typeorm';
import { Vendor_Branches } from '../entities/vendors.entity';
import { newVendorBranchDto, updateVendorBranchDto } from '../dto/branches.dto';
import { searchDto } from 'src/_commons/commons.dto';

@Injectable()
export class BranchesService{

    constructor(
        private readonly common : CommonQueries,
        private readonly vendorsService : VendorsService,
        @Inject('VENDOR_BRANCH_REPOSITORY') private readonly vendorBranchRepository : Repository<Vendor_Branches>){        
    }

    async getBranchById( branchId : number ){
        return await this.vendorBranchRepository.findOne({ id : branchId });
    }

    async getBranchByCode( branchCode : string ){
        return await this.vendorBranchRepository.findOne({ branch_code : branchCode });
    }

    async getBranchBy( filter : Vendor_Branches ){
        return await this.vendorBranchRepository.find(filter);
    }

    async getBranchesByVendorId( vendorId : number, options : searchDto ){
        
        return await this.common.read(options.limit, options.offset, options.keyword, [
            'branch_code',
            'contact_person',
            'mobile_no',
            'telephone_no',
            'address',
            'city',
        ], [
            () => ({ clause : 'andWhere', filter : { vendor_id : vendorId } })
        ]);
    }

    async createBranch(branch : newVendorBranchDto){

        return await this.common.query(this.vendorBranchRepository).create(branch);
    }

    async updateVendorBranch(branchId : number, revisions : updateVendorBranchDto){

        return await this.common.query(this.vendorBranchRepository).update(branchId, revisions);
    }

    async isValid(vendorId : number, requestorId : number){

        const vendor_info = await this.vendorsService.getVendorInfoById({ id : vendorId });

        if(!vendor_info){
            return { error : true, message : `Business does not exists...` };
        }

        if(vendor_info.vendor_status != `Active`){
            return { error : true, message : `Business is no longer available...` };
        }

        if(this.vendorsService.isUserFromVendor(requestorId, vendorId)){
            return { error : true, message : `Creator does is not allowed to make changes to this vendor` };
        }

        /** Check if the user is allowed to do such things.. */
        if(!this.vendorsService.isValidAction(requestorId)){
            return { error : true, message : `User is don't have enough permissions...` };
        }

        return { error : false, message : `` };
    }
}
