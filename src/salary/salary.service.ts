import { Salary } from './entities/salary.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateEmployeeDto } from 'src/employee/dto/update-employee.dto';

@Injectable()
export class SalaryService {
  constructor(
    @InjectRepository(Salary) private salaryRepository: Repository<Salary>) { }

  addSalary(createSalaryDTO: CreateSalaryDto) {

    const sal = new Salary();
    sal.amount = createSalaryDTO.amount;
    sal.annual = createSalaryDTO.amount *12

    this.salaryRepository.save(sal);

    return { statusCode: HttpStatus.OK, message: 'Salary has been added successfully', sal };

  }

  findAll() {
    return this.salaryRepository.find();
  }

  findOne(id: number) {
    return this.salaryRepository.findOne(id);
  }

  update(id: number, UpdateSalaryDto: UpdateSalaryDto) {
    return this.salaryRepository.update(id, UpdateSalaryDto);
  }

  remove(id: number) {
    return this.salaryRepository.delete(id);
  }
}
