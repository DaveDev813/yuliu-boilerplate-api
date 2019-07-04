import { Injectable } from "@nestjs/common";
import nodemailer = require('nodemailer');
import { InsertResult } from "typeorm";

@Injectable()
export class CommonServices{

    async generateCode(length: number,  size ?: number){
    }

    async sendVerificationEmail(email:string, id:number, name:string, tracker:string){

        const verifyLink = `http:localhost:3000/clients/verify/${id}/${tracker}`;
        const subject = `Verify email for your Oozzyyy Account.`;
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: 'GMAIL EMAIL',
                pass: 'GMAIL PASSWORD'
            }
        });

        let info = await transporter.sendMail({
            from: 'Steve <foo@example.com>',
            to: 'jimmybatuhan@voncore.net',
            subject: subject,
            html: `<h2>Thank you for using oozzyyy</h2><p>Hello, <b>${name}</b></p><p>to complete your registration, please verify your email by clicking the link below.</p><br><a href="${verifyLink}">${verifyLink}</a>`
        });

        return true;
    }
}