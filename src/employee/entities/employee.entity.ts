import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn } from 'typeorm';

@Entity()
export class Employee extends BaseEntity{
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  gender: string;

  @CreateDateColumn()
  dateOfBirth: Date;

  @CreateDateColumn()
  hireDate: Date;

  @Column()
  employeeNo: number;

}
