import { JwtStrategy } from './../auth/auth.strategy';
import { Users } from 'src/users/entities/user.entity';
import { AuthService } from './../auth/auth.service';
import { AuthRepository } from './../auth/auth.repository';
import { Admin } from './../admin/entities/admin.entity';
import { AdminService } from './../admin/admin.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeController } from './controller/employee.controller';
import { Employee } from './entities/employee.entity';
import { EmployeeService } from './service/employee.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee,Users]),
    PassportModule.register({ defaultStrategy: 'jwt',property:'users' }),
    JwtModule.register({
      secret:'secret',
      signOptions: {
        expiresIn: "365d",
      },
    }),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService,JwtStrategy,AuthRepository,AuthService]
})
export class EmployeeModule {}
