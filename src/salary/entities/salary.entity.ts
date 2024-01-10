import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Salary extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    amount: number;

    @Column()
    annual: number;
    
    @Column()
    @CreateDateColumn()
    dateCreated: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    
}