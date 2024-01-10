import { Payroll } from './entities/payroll.entity';
import { Salary } from './../salary/entities/salary.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/employee/entities/employee.entity';
import { Repository } from 'typeorm';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';

@Injectable()
export class PayrollService {

  constructor(
    @InjectRepository(Payroll) private payrollRepository: Repository<Payroll>,
    @InjectRepository(Salary) private salaryRepository: Repository<Salary>,
    @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
  ) { } 
  
  async create(createPayrollDto: CreatePayrollDto) {
    const employeeData  = await this.employeeRepository.findOne(createPayrollDto.employeeID.id);
    const salaryData  = await this.salaryRepository.findOne(createPayrollDto.salaryID.id);
    if (employeeData) {
      const pay = new Payroll();
      pay.totalAmount=salaryData.amount
      pay.employeeID = employeeData
      pay.salaryID=salaryData
      pay.date=new Date()
      this.payrollRepository.save(pay);
      return { statusCode: HttpStatus.OK, message: 'Payroll Added Successfully' };
    }
  }


  findAll() {
    return this.payrollRepository.find();
  }

  findOne(id: number) {
    return this.payrollRepository.findOne(id);
  }

  update(id: number, updatePayrollDTO: UpdatePayrollDto) {
    return this.payrollRepository.update(id, updatePayrollDTO);
  }

  remove(id: number) {
    return this.payrollRepository.delete(id);
  }
}
