import { newVendorUserDto, updateVendorUserDto } from './dto/vendor-users.dto';
import { searchDto, primaryIdDto } from 'src/_commons/commons.dto';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards, Controller, Post, Body, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VendorUsersService } from './vendor-users.service';

@ApiUseTags('Products')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('vendor-users')
export class VendorUsersController {
  constructor(private readonly vendorUserService: VendorUsersService) {}

  @Post()
  async getVendorUsers(@Body() options: searchDto) {
    return await this.vendorUserService.getVendorUsers(options);
  }

  @Post(':id')
  async getVendorUserInfo(@Body('id') identity: primaryIdDto) {
    return await this.vendorUserService.getVendorUserInfoById(identity);
  }

  @Post('create')
  async createVendorUser(@Body() user: newVendorUserDto) {
    return await this.vendorUserService.createVendor(user);
  }

  @Post('update/:id')
  async updateVendorUser(
    @Param('id') id: string,
    revisions: updateVendorUserDto,
  ) {
    return await this.vendorUserService.updateVendor(id, revisions);
  }
}
