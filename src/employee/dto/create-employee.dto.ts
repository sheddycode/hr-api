import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateEmployeeDto {

    @ApiProperty({ required: true })
    firstName: string;
  
    @ApiProperty({ required: true })
    lastName: string;
  
    @ApiProperty({ required: true })
    gender: string;
  
    @ApiProperty({ required: true })
    dateOfBirth: Date;
  
    @ApiProperty({ required: true })
    hireDate: Date;
    @IsEmail()
    @ApiProperty({ required: true })
     email: string;
  
    @IsString()
    @MinLength(8)
    @ApiProperty({ required: true })
     password: string;
  
    @IsString()
    @ApiProperty({ required: true })
     username?: string;
  
}
