import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CommonQueries } from 'src/_commons/commons.orm';
import { searchDto, primaryIdDto } from 'src/_commons/commons.dto';
import { newVendorDto, updateVendorDto } from '../dto/vendor.dto';
import { Vendors } from '../entities/vendors.entity';
import voucherCodeGenerator = require('voucher-code-generator');
import moment = require('moment');

@Injectable()
export class VendorsService{

    private search_columns = ['name', 'description', 'business_type', 'email'];

    constructor(
        private readonly common : CommonQueries,
        @Inject('VENDOR_REPOSITORY') private readonly VENDOR_REPOSITORY : Repository<Vendors>){

        this.common.query(this.VENDOR_REPOSITORY)
    }

    async isUserFromVendor(user : number, vendor : number){
        return true;
    }

    async isValidAction(user : number){
        return true;
    }

    async getVendorById(vendorId : number){

        return await this.VENDOR_REPOSITORY.findOne(vendorId);
    }

    async getVendors(options : searchDto){

        const query = await this.VENDOR_REPOSITORY
        .createQueryBuilder()
        .select();

        if(options.keyword){
            this.search_columns.forEach( (column, i) => {
                if(!i){
                    query.where(`${column} LIKE :key`, { key : `%${options.keyword}%` });
                }else{
                    query.orWhere(`${column} LIKE :key`, { key : `%${options.keyword}%` });
                }
            });
        }

        const rows : Array<Vendors> = await query
        .limit(options.limit)
        .offset(options.limit * options.offset)
        .getMany();
            
        const total : number = await query.getCount();

        return{
            rows : rows,
            total : total,
            offset : options.offset,
            keyword : (options.keyword) ? options.keyword : null
        }
    }

    async createVendor(vendor : newVendorDto){

        const createdBy = 1;
        
        const _vendor   = {
            code : voucherCodeGenerator.generate({ length : 5, count : 1, pattern : `#####`, prefix : `VENDOR-` })[0],
            name : vendor.name,
            description : vendor.description ? vendor.description : null,
            email : vendor.email,
            mobile_no : vendor.mobile_no,
            telephone_no : vendor.telephone_no ? vendor.telephone_no : null,
            days_open : vendor.days_open ? vendor.days_open.join(",") : null,
            days_closed : vendor.days_open ? ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].filter( day => vendor.days_open.indexOf(day) <= -1 ).join(",") : null,
            open_hours : vendor.open_hours ? vendor.open_hours : null,
            closed_hours : vendor.open_hours ? moment(vendor.open_hours, 'HH:mm').add(8,'hours').format('HH:mm') : null,
            address : vendor.address,
            city : vendor.city,
            business_type : vendor.business_type,
            vendor_status : 'Deactivated',
            account_type : 'Free',
            created_by : createdBy
        };

        const _result      = await this.VENDOR_REPOSITORY.insert(_vendor);

        _result['payload'] = _vendor;

        return _result;
    }

    async updateVendor(vendorId : number, revisions : updateVendorDto){

        const _revision : any = revisions;

        if(revisions.days_open){

            _revision.days_open = revisions.days_open.join(",");

            _revision.days_closed = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].filter( day => revisions.days_open.indexOf(day) <= -1 ).join(",");
        };

        if(revisions.open_hours){
            
            _revision.closed_hours = moment(revisions.open_hours, 'HH:mm').add(8,'hours').format('HH:mm');
        };

        const _result = await this.common.update(vendorId, _revision);

        _result['payload'] = revisions;

        return _result;       
    }
}
