import { AdminService } from "./../admin/admin.service";
import { LeaveService } from "./../leave/leave.service";
import { Leave } from "./../leave/entities/leave.entity";
import { EmployeeService } from "./../employee/service/employee.service";
import { Payroll } from "./../payroll/entities/payroll.entity";
import { PayrollService } from "./../payroll/payroll.service";
import { JwtStrategy } from "./auth.strategy";
import { SalaryService } from "./../salary/salary.service";
import { Salary } from "./../salary/entities/salary.entity";
import { AuthRepository } from "./auth.repository";
import { UsersService } from "./../users/users.service";
import { Users } from "./../users/entities/user.entity";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "src/employee/entities/employee.entity";
import { Admin } from "@/admin/entities/admin.entity";
import { UsersModule } from "@/users/users.module";
import { RolesGuard } from "./role.guard";
import { JwtAuthGuard } from "./auth.guard";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt", property: "users" }),
    JwtModule.register({
      secret: "secret",
      signOptions: {
        expiresIn: "365d",
      },
    }),
    TypeOrmModule.forFeature([Users, Admin, Leave, Salary, Payroll, Employee]),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    RolesGuard,
    JwtAuthGuard,
    JwtStrategy,
    LeaveService,
    AdminService,
    EmployeeService,
    SalaryService,
    PayrollService,
    UsersService,
    UsersService,
    AuthRepository,
  ],
})
export class AuthModule {}
