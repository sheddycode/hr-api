import { Controller, Get, Post, Body, Patch, Param, Delete, ClassSerializerInterceptor, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Users } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import {  LoginDto, RegisterDto } from './dto/create-auth.dto';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('Auth Controller')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  private register(@Body() body: RegisterDto): Promise<Users | never> {
    return this.service.register(body);
    
  }

  @Post('login')
  private login(@Body() body: LoginDto): Promise<string | never> {
    return this.service.login(body);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  private async refresh(@Req() { user }: any|  Request): Promise<string | never> {
    return this.service.refresh(<Users>user);
  }
  @Get('users')
  @UseGuards(AuthGuard()) 
  private getUsers(){
    return this.service.getUsers()
  }
  
}
