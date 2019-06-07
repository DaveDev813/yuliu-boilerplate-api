import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CommonQueries } from 'src/_commons/commons.orm';
import { Repository } from 'typeorm';
import { Vendor_Branches } from '../entities/vendors.entity';
import { newVendorBranchDto, updateVendorBranchDto } from '../dto/branches.dto';
import { searchDto } from 'src/_commons/commons.dto';
import voucherCodeGenerator = require('voucher-code-generator');
import moment = require('moment');

@Injectable()
export class BranchesService{

    constructor(
        private readonly common : CommonQueries,
        private readonly vendorsService : VendorsService,
        @Inject('VENDOR_BRANCH_REPOSITORY') private readonly vendorBranchRepository : Repository<Vendor_Branches>){        
            
            this.common.query(this.vendorBranchRepository);
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

        const _branch = {
            vendor_id : branch.vendor_id,
            branch_code : voucherCodeGenerator.generate({ length : 5, count : 1, pattern : `#####`, prefix : `BRANCH-` })[0],
            contact_person : branch.contact_person,
            mobile_no : branch.mobile_no,
            telephone_no : branch.telephone_no ? branch.telephone_no : null,
            days_open : branch.days_open ? branch.days_open.join(",") : null,
            days_closed : branch.days_open ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].filter( day => branch.days_open.indexOf(day) <= -1).join(",") : null,
            open_hours : branch.open_hours ? branch.open_hours : null,
            closed_hours : branch.open_hours ? moment(branch.open_hours, `HH:mm`).add(8, 'hours').format(`HH:mm`) : null,
            address : branch.address,
            city : branch.city,
            created_by : 1
        };

        return await this.common.insert(_branch);
    }

    async updateVendorBranch(branchId : number, revisions : updateVendorBranchDto){

        const _branch : any = revisions;

        if(_branch.days_open){

            _branch.days_closed = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].filter( day => _branch.days_open.indexOf(day) <= -1).join(",");            
            _branch.days_open = _branch.days_open.join(",");
        }

        if(_branch.open_hours){

            _branch.closed_hours = moment(revisions.open_hours, 'HH:mm').add(8,'hours').format('HH:mm');
        }

        const _result = await this.common.update(Number(branchId), _branch);

        _result['payload'] = _branch;

        return _result;  
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
