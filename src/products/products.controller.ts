import { Controller, Param, Post, Body, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { newProductDto, updateProductDto } from './dto/products.dto';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { searchDto, primaryIdDto } from 'src/_commons/commons.dto';
import { identity } from 'rxjs';

@ApiUseTags('Products')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('products')
export class ProductsController{

    constructor(
        private readonly productService : ProductsService
    ){}

    @Post()
    async getProducts(@Body() options : searchDto){

        return await this.productService.getProducts(options);
    }

    @Post(':id')
    async getProductInfo(@Body() identity : primaryIdDto){

        return await this.productService.getProductInfoById(identity);
    }

    @Post('create')
    async addNewProduct(@Body() product : newProductDto){

        return await this.productService.createProduct(product);
    }

    @Put('update/:id')
    async updateProduct(@Param('id') id : string, @Body() product : updateProductDto){

        return await this.productService.updateProduct(id, product);
    }
}
