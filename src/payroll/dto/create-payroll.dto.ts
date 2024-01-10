import { Salary } from './../../salary/entities/salary.entity';
import { Employee } from './../../employee/entities/employee.entity';
import { ApiProperty } from '@nestjs/swagger';
export class CreatePayrollDto {
    
    @ApiProperty({ required: true })
    date: Date;

    @ApiProperty({ required: true })
    employeeID: Employee;

    @ApiProperty({ required: true })
    salaryID: Salary;
}

