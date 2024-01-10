import { AuthRepository } from './../../auth/auth.repository';
import { Users } from 'src/users/entities/user.entity';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { Employee } from '../entities/employee.entity';

@Injectable()
export class EmployeeService {

  constructor(
    @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
    @Inject(AuthRepository) private authRepository: AuthRepository,
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) { }


  async create(createEmployeeDto: CreateEmployeeDto) {
    var username = createEmployeeDto.username
    let user: Users = await this.userRepository.findOne({ where: { username } });
    const emp = new Employee();
    emp.dateOfBirth = createEmployeeDto.dateOfBirth;
    emp.firstName = createEmployeeDto.firstName
    emp.gender = createEmployeeDto.gender;
    emp.hireDate = createEmployeeDto.hireDate;
    emp.employeeNo = Math.floor(Math.random() * 90000) + 10000;
    emp.dateOfBirth = createEmployeeDto.dateOfBirth;
    emp.lastName = createEmployeeDto.lastName;
    emp.email = createEmployeeDto.email;

    try {

      user = new Users();

      user.username = createEmployeeDto.username;
      user.email = createEmployeeDto.email;
      user.isActive = true
      user.firstName = createEmployeeDto.firstName
      user.lastName = createEmployeeDto.lastName
      // user.userType = "employee"
      user.password = this.authRepository.encodePassword(createEmployeeDto.password);

      this.userRepository.save(user);
      this.employeeRepository.save(emp);
      return { message: 'Employee successfully created!' };
    } catch (error) {
      console.log(error)
    }




    return { statusCode: HttpStatus.OK, message: 'EMployee created successfully', emp };

  }

  findAll() {
    return this.employeeRepository.find();
  }

  findOne(id: number) {
    return this.employeeRepository.findOne(id);
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeRepository.update(id, updateEmployeeDto);
  }

  remove(id: number) {
    return this.employeeRepository.delete(id);
  }
}
