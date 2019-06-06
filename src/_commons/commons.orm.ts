import { Injectable } from "@nestjs/common";
import { Entity, Repository, Like } from "typeorm";

@Injectable()
export class CommonQueries{
    
    repository : Repository<any>; 

    columnsToSelect : Array<string>;
    
    query(@Entity() repo : Repository<any>){

        this.repository = repo;

        return this;
    }

    private setColumnsToSearch(columns : Array<string>, keyword : any){

        let cols : { [ key : string ] : any } = {};

        columns.forEach(col => { cols[col] = Like(`%${keyword}%`) });
        
        return cols;
    }

    /** 
     * Counts the number of total number of rows of the in the current repository
     */
    async count(filter ?: string, searchColumns ?: Array<string>){

        const query = this.repository.createQueryBuilder()

        if(filter && searchColumns){

            query.where(this.setColumnsToSearch(searchColumns, filter))
        }
    
        return await query.select().getCount();
    }

    async create(data : any){
        
        return await this.repository.create(data);
    }

    async insert(data : any){

        return await this.repository.insert(data);
    }

    async read(limit : number, offset : number, keyword ?: string, searchColumns ?: Array<string>, conditions ?: Array<Function>){

        const query = this.repository.createQueryBuilder().select();
        
        if(keyword && searchColumns){

            searchColumns.forEach( (col, i) => {
                if(!i){
                    query.where(`${col} LIKE :key`, { key : `%${keyword}%` });
                }else{
                    query.orWhere(`${col} LIKE :key`, { key : `%${keyword}%` });
                }
            });
        }

        /**
         * Additional conditions for filtering the table
         */
        
        if(conditions && conditions.length){

            let cond : { clause : string, filter : string };

            conditions.forEach( fn => {

                cond = fn();

                query[cond.clause](cond.filter);

            });
        }

        const totalRows : number = await query.getCount();

        const queryResult = await query.limit(limit).offset(offset * limit).getMany();
        
        return { rows : queryResult, limit : limit, offset : offset, totalRows : totalRows, keyword : keyword };
    }

    async update(id : number, revisions : any){

        return await this.repository.update(id , revisions);
    }

    async delete(id : number){

        return await this.repository.delete(id);
    }

}