import { newVendorUserDto, updateVendorUserDto } from "./dto/vendor-users.dto";
import { searchDto, primaryIdDto } from "src/_commons/commons.dto";

@ApiUseTags('Products')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('vendor-users')
export class VendorUsersController{

    constructor(
        private readonly vendorUserService : VendorUserService){}

    @Post()
    async getVendorUsers(@Body() options : searchDto){
        return await this.vendorUserService.getVendorUsers(options);
    }

    @Post(':id')
    async getVendorUserInfo(@Body('id') identity : primaryIdDto ){
        return await this.vendorUserService.getVendorUsersInfoById(identity);
    }

    @Post('create')
    async createVendorUser(@Body() user : newVendorUserDto){
        return await this.vendorUserService.createVendorUser(user);
    }

    @Post('update/:id')
    async updateVendorUser(@Param('id') id :string , revisions : updateVendorUserDto){
        return await this.vendorUserService(id, revisions);

    }
}