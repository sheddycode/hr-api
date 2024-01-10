import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn } from 'typeorm';

@Entity()
export class Admin extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
  
    @Column()
    username: string;
  
    @Column()
    email: string;
  
    @Column("char", { length: 1 })
    gender: string;
  
    @CreateDateColumn()
    dateOfBirth: string;
}
