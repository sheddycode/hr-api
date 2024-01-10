import { Module } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { SalaryController } from './salary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salary } from './entities/salary.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Salary]),
    PassportModule.register({ defaultStrategy: 'jwt', }),
  ],
  controllers: [SalaryController],
  providers: [SalaryService]
})
export class SalaryModule {}
