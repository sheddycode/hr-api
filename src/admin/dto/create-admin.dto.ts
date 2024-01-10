import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MaxLength } from "class-validator";

export class CreateAdminDto {
    @ApiProperty({ required: true })
    firstName: string;

    @ApiProperty({ required: true })
    lastName: string;

    @ApiProperty({ required: true })
    username: string;

    @IsEmail()
    email: string;
    
    @MaxLength(1, { message: 'Gender must be M or F)' })
    gender: string;

    dateOfBirth: string;
}
