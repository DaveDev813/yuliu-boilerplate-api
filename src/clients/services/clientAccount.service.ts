import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Clients_Information } from '../entities/clients.entity';
import { Client_Accounts } from '../entities/clientAccounts.entity';
import * as md5 from 'md5';
import * as uuid from 'uuid/v1';
import { RegisterClientAccount } from '../dto/clientAccount.dto';

@Injectable()
export class ClientAccountService {

  constructor(
    @Inject('CLIENT_ACCOUNT_REPOSITORY')
    private readonly clientAccount: Repository<Client_Accounts>,
    @Inject('CLIENT_INFO_REPOSITORY')
    private readonly clientInformation: Repository<Clients_Information>,
  ) {
  } 

  async verifyAccount(id:number){

    const result = await this.clientAccount.update(id, { isVerified : true});

    return result;

  }

  async getAccountByVerificationToken(id:number, tracker:string){

    const result = await this.clientAccount.createQueryBuilder().select().where({
      id, verficationToken : tracker
    }).getOne();

    return result;
  }

  async registerNewClient(account: RegisterClientAccount){

    const verificationToken = uuid();
    const result = await this.clientAccount.insert({ 
      email : account.email, 
      password : md5(account.password), 
      verificationToken 
    });

    if(result.generatedMaps){

      const accountInformation = await this.clientInformation.insert({
        firstname : account.firstname,
        lastname : account.lastname,
        mobileNo : account.mobileNo,
        email : account.email,
        account_id : result.generatedMaps[0].id
      });

      if(accountInformation){

        return {
          id : result.generatedMaps[0].id,
          name : account.firstname,
          email : account.email,
          verificationToken:verificationToken
        }

      }else{

        return false;
      }

    }else{

      return false;
    }

  }

  async authenticateClientAccount(email: string, password: string){

    const account = await this.clientAccount.createQueryBuilder().select().where({ email, password : md5(password) }).getOne();

    return account;
  }

  async checkDuplicateEmail(email: string){

    const count = await this.clientAccount.createQueryBuilder().select().where({ email }).getCount();

    return count;
  }

  async getClientInfoByAccountId(accountId: number){

    const information = await this.clientInformation.createQueryBuilder().select().where({ accountId }).getOne();

    return information;
  }
}