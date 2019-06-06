import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User_Features{
    
    @PrimaryGeneratedColumn() 
    id: number;
}

@Entity()
export class App_Features{
    
    @PrimaryGeneratedColumn() 
    id: number;
}

@Entity()
export class Employee_Positions{
    
    @PrimaryGeneratedColumn() 
    id: number;
}

