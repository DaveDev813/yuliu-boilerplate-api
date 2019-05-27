import { Injectable } from "@nestjs/common";
import { Entity, Repository } from "typeorm";

@Injectable()
export class CommonQueries{
    
    repository : Repository<any>; 

    query(@Entity() repo : Repository<any>){

        this.repository = repo;

        return this;
    }

    async create(data : any){

        return await this.repository.create(data);
    }

    async read(limit : number, offset : number, keyword ?: string, searchColumns ?: Array<string>){

        const query = this.repository
        .createQueryBuilder()
        .select()
        .limit(limit)
        .offset(offset * limit);

        if(keyword && searchColumns){

            let whereObj : Object = {};
            
            searchColumns.forEach( column => { whereObj[column] = keyword; });

            query.where(whereObj);
        }

        return await query.getManyAndCount();
    }

    async update(id : number, revisions : any){

        return await this.repository.update(id , revisions);
    }

    async delete(id : number){

        return await this.repository.delete(id);
    }

}