import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Products } from './products.entity';
import { newProductDto, updateProductDto } from './dto/products.dto';
import { CommonQueries } from 'src/_commons/crud.orm';
import { searchDto, primaryIdDto } from 'src/_commons/commons.dto';

@Injectable()
export class ProductsService{

    private searchColumns = [];

    constructor(
        private readonly commons : CommonQueries,
        @Inject('PRODUCT_REPOSITORY') private readonly productRespository : Repository<Products>){

        this.commons.query(this.productRespository);
    }

    async getProductInfoById(identity : primaryIdDto){
        
        return await this.productRespository.findOne(identity.id);
    }

    async getProducts(options : searchDto){

        const result = await this.commons.read(Number(options.limit), Number(options.offset), options.keyword, this.searchColumns);

        return result;
    }

    async createProduct(product : newProductDto){

        const result = await this.commons.create(product);

        return result;
    }

    async updateProduct(id : string, revision : updateProductDto){

        const result = await this.commons.update(Number(id), revision);

        return result;
    }
    
    async deleteProduct(id : string){

        const result = await this.commons.delete(Number(id));

        return result;
    }
}


