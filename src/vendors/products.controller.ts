import {
  Controller,
  Post,
  Body,
  Param,
  BadRequestException,
  Put,
  UseGuards,
} from '@nestjs/common';
import { VendorsService } from './services/vendors.service';
import { BranchesService } from './services/branches.service';
import { NewVendorProduct, UpdateVendorProductDto } from './dto/products.dto';
import { ProductsService } from './services/products.service';
import { searchDto } from 'src/_commons/commons.dto';
import voucherCodeGenerator = require('voucher-code-generator');
import moment = require('moment');
import faker = require('faker');
import _ = require('lodash');
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

//@ApiUseTags(`Vendors Products`)
// @ApiBearerAuth()
// @UseGuards(AuthGuard())
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productService: ProductsService,
    private readonly branchesService: BranchesService,
    private readonly vendorsService: VendorsService,
  ) {}

  @Post()
  async getProducts(@Body() options: searchDto) {
    return await this.productService.getProducts(options);
  }

  @Post('create')
  async createVendorProduct(@Body() product: NewVendorProduct) {
    // const vendor = await this.vendorsService.getVendorById(product.vendor_id);

    const branch = await this.branchesService.getBranchById(product.branchId);

    if (!branch) {
      return {
        error: { description: 'No Branch found' },
      };
    }

    // const branches = await this.branchesService.getBranchBy({ vendor_id : product.vendor_id });

    // if(!vendor){ throw new BadRequestException(`Vendor is does not exists..`); }

    // if(vendor.vendor_status === `Disabled`){ throw new BadRequestException(`Vendor is no longer active..`); }

    // if(!branches){ throw new BadRequestException(`No branches available in this vendor..`); }

    // if(!branches.filter( branch => branch.id == product.branch_id)){
    //   throw new BadRequestException(`This branch does not belong to this vendor..`);
    // }

    // if(branch.branch_status === `Disabled`){ throw new BadRequestException(`Branch is no longer active..`); }

    const newProduct = await this.productService.createVendorProduct(product);

    return {
      data: { productId: newProduct.raw.insertId },
    };
  }

  @Post('create/faker')
  async createFakeVendorProduct() {
    _.times(100, async () => {
      const fakeData: NewVendorProduct = {
        branchId: 1,
        name: faker.company.catchPhrase(),
        description: '',
        productType: `Service`,
        duration: null,
        productCost: 600.6,
        productPrice: 115.0,
        productComission: 5.5,
      };
      fakeData[`createdBy`] = 1;
      fakeData[`productCode`] = voucherCodeGenerator.generate({
        length: 5,
        count: 1,
        pattern: `#####`,
        characters: voucherCodeGenerator.charset(`alphabetic`),
        prefix: `VND`,
        suffix: moment()
          .format(`YYYY`)
          .toString(),
      })[0];

      await this.productService.createVendorProduct(fakeData);
    });
  }

  @Put('update/:id')
  async updateVendorProduct(
    @Param(`id`) productId: number,
    @Body() revisions: UpdateVendorProductDto,
  ) {
    const product = await this.productService.getProductInfo(productId);

    if (!product) {
      return {
        error: { description: 'No Product found ' },
      };
    }

    await this.productService.updateVendorProduct(productId, revisions);

    return await this.productService.getProductInfo(productId);
  }
}
