import { Controller, Post, Param, Body, Put, BadRequestException } from '@nestjs/common';
import { searchDto } from 'src/_commons/commons.dto';
import { newVendorBranchDto, updateVendorBranchDto } from './dto/branches.dto';
import { BranchesService } from './services/branches.service';
import moment = require('moment');
import voucherCodeGenerator = require('voucher-code-generator');
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags(`Vendors Branches`)
@Controller('vendor/branches')
export class BranchesController{

    constructor(
        private readonly branchesService : BranchesService){
    }

    @Post(`branch/:id`)
    async getBranchById(@Param(`id`) branchId : number){

        return await this.branchesService.getBranchById(branchId);
    }

    @Post(`:id/branches`)
    async getVendorBranches(@Param(`id`) vendorId : number, @Body() options : searchDto){

        return await this.branchesService.getBranchesByVendorId(vendorId, options);
    }

    @Post(`create`)
    async createBusinessBranch(@Body() branch : newVendorBranchDto){   

        /** Check if business is still active */
        /** Check if the user is authorized user from the business */
        /** Check if the user is allowed to do such things.. */
        const valid : { error : boolean, message : string } = await this.branchesService.isValid(branch.vendor_id, branch.created_by);

        if(valid.error){ throw new BadRequestException(valid.message); }

        branch[`branch_status`] = `Disabled`;
        branch[`branch_code`]   = voucherCodeGenerator.generate({
            length     : 5,
            count      : 4,
            pattern    : `####`,
            characters : voucherCodeGenerator.charset(`alphabetic`),
            prefix     : `VND${branch.vendor_id.toString().padStart(4, `0`)}`
        });

        return await this.branchesService.createBranch(branch);
    }

    @Put(`update/:id`)
    async updateBusinessbranch(@Param(`id`) id : number, @Body() revisions : updateVendorBranchDto){

        /** Check if business is still active */
        /** Check if the user is authorized user from the business */
        /** Check if the user is allowed to do such things.. */
        if(!this.branchesService.isValid(id, revisions.updated_by)){

            revisions[`last_date_updated`] = moment().format(`YYYY-MM-DD HH:mm:ss`);

            return await this.branchesService.updateVendorBranch(id, revisions);
        }
    }
}
