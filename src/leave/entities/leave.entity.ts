import { Admin } from './../../admin/entities/admin.entity';
import { UserInfo } from "os";
import { Employee } from "src/employee/entities/employee.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Leave extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    reasonForLeave: string;

    @Column()
    approved: boolean;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;


    @Column()
    @CreateDateColumn()
    dateCreated: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne((type) => Employee, { eager: true })
    @JoinColumn()
    employee: Employee;

    @ManyToOne((type) => Admin, { eager: true })
    @JoinColumn()
    approvedBy: Admin;
}
