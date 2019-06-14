import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CommonQueries } from 'src/_commons/commons.orm';
import { Repository } from 'typeorm';
import { VendorBranches } from '../entities/vendors.entity';
import { newVendorBranchDto, updateVendorBranchDto } from '../dto/branches.dto';
import { searchDto } from 'src/_commons/commons.dto';
import voucherCodeGenerator = require('voucher-code-generator');
import moment = require('moment');

@Injectable()
export class BranchesService{

    private search_columns = ["branch_code", "contact_person", "city", "address"];

    constructor(
        private readonly common : CommonQueries,
        private readonly vendorsService : VendorsService,
        @Inject('VENDOR_BRANCH_REPOSITORY') private readonly vendorBranchRepository : Repository<VendorBranches>){        
            
        this.common.query(this.vendorBranchRepository);
    }
    
    async getBranchesByVendorId(vendorId: number, options : searchDto, conditions ?: Array<Function>){

        const query = this.vendorBranchRepository
        .createQueryBuilder()
        .select();

        if(options.keyword){

            this.search_columns.forEach( (col, i) => {
                if(!i){
                    query.where(`${col} LIKE :key`, { key : `%${options.keyword}%` });
                }else{
                    query.orWhere(`${col} LIKE :key`, { key : `%${options.keyword}%` });
                }
            });
        }

        query.andWhere(`vendor_id = :vendor`, { vendor : vendorId});

        const total : number = await query.getCount();
        const rows : Array<VendorBranches> = await query.
        limit(options.limit)
        .offset(options.limit * options.offset)
        .getMany();

        return{
            rows : rows,
            total : total,
            offset : options.offset,
            keyword : (options.keyword) ? options.keyword : null
        }
    }

    async getBranches(options : searchDto, conditions ?: Array<Function>){
        
        const search_columns = ["branch_code", "contact_person", "city", "address"];

        const result = await this.common
        .query(this.vendorBranchRepository)
        .read(options.limit, options.offset, options.keyword, search_columns, conditions);

        return result;
    }

    async getBranchById( branchId : number ){
        return await this.vendorBranchRepository.findOne({ id : branchId });
    }

    async getBranchByCode( branchCode : string ){
        return await this.vendorBranchRepository.findOne({ branch_code : branchCode });
    }

    async getBranchBy( conditions : { [key:string] : any } ){
        return await this.vendorBranchRepository.find(conditions);
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

        const vendor_info = await this.vendorsService.getVendorById(vendorId);

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
