import { Employee } from './../../employee/entities/employee.entity';
import { Admin } from './../../admin/entities/admin.entity';
import { ApiProperty } from "@nestjs/swagger";

export class RequestLeaveDto {


    @ApiProperty({ required: true })
    reasonForLeave: string;

    @ApiProperty({required:true})
    email:string;
  
    @ApiProperty({ required: true })
    startDate: Date;
  
    @ApiProperty({ required: true })
    endDate: Date;
    
    @ApiProperty({required: true })
    employee: Employee;

    @ApiProperty({required: true })
    approvedBy: Admin;
  

}
