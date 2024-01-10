import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsEmail()
    @ApiProperty({ required: true })
    public readonly email: string;
  
    @IsString()
    @MinLength(8)
    @ApiProperty({ required: true })
    public readonly password: string;
  
    @IsString()
    @ApiProperty({ required: true })
    public readonly username?: string;

    @IsString()
    @ApiProperty({ required: true })
    public readonly firstName?: string;

    @IsString()
    @ApiProperty({ required: true })
    public readonly lastName?: string;
  }
  
  export class LoginDto {
    @IsString()
    @ApiProperty({ required: true })
    public readonly username: string;
  
    @IsString()
    @ApiProperty({ required: true })
    public readonly password: string;
  }