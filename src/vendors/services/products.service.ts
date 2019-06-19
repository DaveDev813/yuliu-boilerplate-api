import { Injectable, Inject } from '@nestjs/common';
import { CommonQueries } from 'src/_commons/commons.orm';
import { Repository } from 'typeorm';
import {
  VendorProducts,
  VendorBranches,
  Vendors,
} from '../entities/vendors.entity';
import { newVendorProduct, updateVendorProductDto } from '../dto/products';
import voucherCodeGenerator = require('voucher-code-generator');
import moment = require('moment');
import { searchDto } from 'src/_commons/commons.dto';

@Injectable()
export class ProductsService {
  private search_columns = [
    'product_code',
    'name',
    'description',
    'product_type',
  ];

  constructor(
    private readonly common: CommonQueries,
    @Inject('VENDOR_REPOSITORY')
    private readonly VENDOR_REPOSITORY: Repository<Vendors>,
    @Inject('VENDOR_PRODUCT_REPOSITORY')
    private readonly PRODUCT_REPOSITORY: Repository<VendorProducts>,
    @Inject('VENDOR_BRANCH_REPOSITORY')
    private readonly BRANCHES_REPOSITORY: Repository<VendorBranches>,
  ) {}

  async getProductsByVendorId(vendorId: number, options: searchDto) {
    const query = this.PRODUCT_REPOSITORY.createQueryBuilder().select();

    if (options.keyword) {
      this.search_columns.forEach((column, i) => {
        if (!i) {
          query.where(`${column} LIKE :key`, { key: `%${options.keyword}%` });
        } else {
          query.orWhere(`${column} LIKE :key`, { key: `%${options.keyword}%` });
        }
      });
    }

    query.andWhere(`vendor_id = :vendor`, { vendor: vendorId });

    const total: number = await query.getCount();
    const rows: VendorProducts[] = await query
      .limit(options.limit)
      .offset(options.limit * options.offset)
      .getMany();

    return {
      rows,
      total,
      offset: options.offset,
      keyword: options.keyword ? options.keyword : null,
    };
  }

  async getProducts(options: searchDto) {
    return await this.common
      .query(this.PRODUCT_REPOSITORY)
      .read(options.limit, options.offset, options.keyword);
    // let query = this.PRODUCT_REPOSITORY
    // .createQueryBuilder(`products`)
    // if(options.keyword){
    //     query = this.common.like(query, {
    //         columns : ["product_code", "name", "description", "product_type"],
    //         keyword : options.keyword
    //     });
    // }
    // if(conditions){
    //     query = this.common.conditions(query, conditions);
    // }
    // query = query.select()
    // .leftJoinAndSelect( () => this.VENDOR_REPOSITORY.createQueryBuilder(), "vendor", "vendor.id = products.vendor_id")
    // .leftJoinAndSelect( () => this.BRANCHES_REPOSITORY.createQueryBuilder(), "branches", "branches.vendor_id = vendor.id")
    // const totalRows = await query.getCount();
    // const result = await this.common
    // .query(this.PRODUCT_REPOSITORY)
    // .read(options.limit, options.offset, options.keyword, search_columns, conditions);
    // return result;
  }

  async getProductInfo(productId: number) {
    return await this.PRODUCT_REPOSITORY.findOne(productId);
  }

  async updateVendorProduct(
    productId: number,
    revisions: updateVendorProductDto,
  ) {
    const _revisions: any = revisions;

    _revisions.updated_by = 1;
    _revisions.last_date_updated = '2020-01-01';

    // tslint:disable-next-line:variable-name
    const _result = await this.PRODUCT_REPOSITORY.update(productId, _revisions);

    // _result.payload = _revisions;

    return _result;
  }

  async createVendorProduct(product: newVendorProduct) {
    // tslint:disable-next-line:variable-name
    const created_by = 1;
    const _product = {
      branch_id: product.branch_id,
      name: product.name,
      product_code: voucherCodeGenerator.generate({
        length: 5,
        count: 1,
        pattern: `#####`,
        prefix: `VENDOR-`,
      })[0],
      description: product.description ? product.description : null,
      product_type: product.product_type,
      duration: product.duration ? product.duration : null,
      product_cost: product.product_cost,
      product_price: product.product_price,
      product_comission: product.product_comission,
      created_by,
    };

    // tslint:disable-next-line:variable-name
    const _result = await this.PRODUCT_REPOSITORY.insert(_product);

    // _result.payload = _product;

    return _result;
  }
}
