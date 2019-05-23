import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Products } from './products.entity';
import { newProductDto, updateProductDto } from './dto/products.dto';

@Injectable()
export class ProductsService{

    constructor(
        @Inject('PRODUCT_REPOSITORY') private readonly productRespository : Repository<Products>
    ){

    }

    async addNewProduct(product : newProductDto){

        return await this.productRespository.insert(product);
    }

    async updateProduct(id : string, revision : updateProductDto){

        return await this.productRespository
        .createQueryBuilder()
        .update(revision).where(" id = :id", {id : id})
        .execute();
    }

    async getProductInfo(id : string){

        return await this.productRespository.findOne(id);
    }
    
    async getProducts(limit : number, offset : number, keyword ?: string){

        let query = this.productRespository
        .createQueryBuilder()
        .select()
        .offset(offset * limit)
        .limit(limit)
        
        if(keyword){
        
            query.where({
                product_code : keyword,
                product_name : keyword,
                description : keyword,
                unit_of_measure : keyword,
                unit_cost : keyword,
                unit_price : keyword,
                unit_srp : keyword
            })
        }
        
        return await query.execute();
    }
}
