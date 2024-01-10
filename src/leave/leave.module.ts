import { Auth } from './../auth/entities/auth.entity';
import { JwtStrategy } from './../auth/auth.strategy';
import { UsersService } from './../users/users.service';
import { AuthService } from './../auth/auth.service';
import { AuthRepository } from './../auth/auth.repository';
import { Admin } from './../admin/entities/admin.entity';
import { Employee } from './../employee/entities/employee.entity';
import { Leave } from './entities/leave.entity';
import { EmployeeService } from './../employee/service/employee.service';
import { AdminService } from './../admin/admin.service';
import { Module } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { LeaveController } from './leave.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Users } from '@/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Leave,Employee,Users,Admin]),
    PassportModule.register({ defaultStrategy: 'jwt',property:'users' }),
    JwtModule.register({
      secret:'secret',
      signOptions: {
        expiresIn: "365d",
      },
    }),
  ],
  controllers: [LeaveController],
  providers: [LeaveService,JwtStrategy,AdminService,EmployeeService,AuthService,UsersService, AuthRepository]
})
export class LeaveModule {}
