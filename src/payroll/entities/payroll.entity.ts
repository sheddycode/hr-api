import { Salary } from './../../salary/entities/salary.entity';
import { Employee } from "src/employee/entities/employee.entity";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Admin } from "typeorm";

@Entity()
export class Payroll extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
 

    @Column()
    totalAmount: number;

    @Column()
    date: Date;

    @Column()
    @CreateDateColumn()
    dateCreated: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne((type) => Employee, { eager: true })
    @JoinColumn()
    employeeID: Employee;

    @ManyToOne((type) => Salary, { eager: true })
    @JoinColumn()
    salaryID: Salary;
}