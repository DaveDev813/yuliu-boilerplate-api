import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { searchProductDto, newProductDto, updateProductDto } from './dto/products.dto';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('Products')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('products')
export class ProductsController{

    constructor(
        private readonly productService : ProductsService
    ){

    }

    @Get(':id')
    async getProductInfo(@Param('id') id : string){

        return await this.productService.getProductInfo(id);
    }

    @Post()
    async getProducts(@Body() options : searchProductDto){

        return await this.productService.getProducts(options.limit, options.offset, options.keyword);
    }

    @Post('create')
    async addNewProduct(@Body() product : newProductDto){

        return await this.productService.addNewProduct(product);
    }

    @Put('update/:id')
    async updateProduct(@Param('id') id : string, @Body() product : updateProductDto){

        return await this.productService.updateProduct(id, product);
    }

    @Delete('delete/:id')
    disableProduct(@Param('id') id : string){

    }
}
