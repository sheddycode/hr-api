import { Role } from './../../auth/role.enum';
import { PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity, Entity, UpdateDateColumn } from "typeorm";


@Entity()
export class Users extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
  
    @Column()
    username: string;

    @Column()
    password: string;
  
    @Column()
    email: string;

    @Column({ type: 'enum', enum: Role ,default:Role.Employee})
    role: Role;
  
    @Column()
    isActive: boolean

    @Column()
    @CreateDateColumn()
    dateCreated: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date
    
    @Column({ type: 'timestamp', nullable: true, default: null })
    public lastLoginAt: Date | null;
}
