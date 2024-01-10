import { Users } from 'src/users/entities/user.entity';
import { UsersService } from './../users/users.service';
import { AuthRepository } from './../auth/auth.repository';
import { Payroll } from './entities/payroll.entity';
import { EmployeeService } from './../employee/service/employee.service';
import { SalaryService } from './../salary/salary.service';
import { Employee } from './../employee/entities/employee.entity';
import { Salary } from './../salary/entities/salary.entity';
import { Module } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { PayrollController } from './payroll.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payroll,Salary,Users,Employee]),
    PassportModule.register({ defaultStrategy: 'jwt',property:'users' }),
    JwtModule.register({
      secret:'secret',
      signOptions: {
        expiresIn: "365d",
      },
    }),
  ],
  controllers: [PayrollController],
  providers: [PayrollService,SalaryService,UsersService,EmployeeService,AuthRepository]
})
export class PayrollModule {}
