import { RolesGuard } from './../auth/role.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '@/auth/auth.guard';
import { Role } from '@/auth/role.enum';
import { Roles } from '@/auth/roles.decorator';
@ApiTags('Salary Controller')
@ApiBearerAuth()
@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @Post('/add')
  @UseGuards(AuthGuard())  
  @Roles(Role.Admin)
  create(@Body() createSalaryDto: CreateSalaryDto) {
    return this.salaryService.addSalary(createSalaryDto);
  }

  @Get("/all")
  @UseGuards(AuthGuard())
  @Roles(Role.Admin)
  findAll() {
    return this.salaryService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.salaryService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateSalaryDto: UpdateSalaryDto) {
    return this.salaryService.update(+id, updateSalaryDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.salaryService.remove(+id);
  }
}
