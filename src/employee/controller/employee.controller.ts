import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { EmployeeService } from '../service/employee.service';


@ApiTags('Employee Controller')
@ApiBearerAuth()
@Controller('employee')
export class EmployeeController {

  constructor(private readonly employeeService: EmployeeService) { }

  @Post()
  // @UseGuards(AuthGuard()) 
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  @UseGuards(AuthGuard()) 
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard()) 
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard()) 
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard()) 
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
