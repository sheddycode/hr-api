import { RolesGuard } from './auth/role.guard';
import { Strategy } from 'passport-jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';
import { LeaveModule } from './leave/leave.module';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { PayrollModule } from './payroll/payroll.module';
import { SalaryModule } from './salary/salary.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { config } from './orm.config';

@Module({
  imports: [
    EmployeeModule,
    TypeOrmModule.forRoot(config),
    LeaveModule,
    AdminModule,
    UsersModule,
    PayrollModule,
    SalaryModule,
    AuthModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  
})
export class AppModule {}
