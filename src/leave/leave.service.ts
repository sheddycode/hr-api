import { Employee } from './../employee/entities/employee.entity';
import { Admin } from './../admin/entities/admin.entity';
import { Leave } from './entities/leave.entity';
import { Injectable, HttpStatus } from '@nestjs/common';
import { RequestLeaveDto } from './dto/create-leave.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LeaveService {
  constructor(
    @InjectRepository(Leave) private leaveRepository: Repository<Leave>,
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
  ) { }

  async requestForLeave(createLeaveDto: RequestLeaveDto) {
    const employeeData  = await this.employeeRepository.findOne(createLeaveDto.employee.id);
    if (employeeData) {
      const leave = new Leave();
      leave.approved = false;
      leave.startDate = createLeaveDto.startDate;
      leave.endDate = createLeaveDto.endDate;
      leave.reasonForLeave = createLeaveDto.reasonForLeave;
      leave.approvedBy = null
      leave.employee = employeeData
      this.leaveRepository.save(leave);
      return { statusCode: HttpStatus.OK, message: 'Leave Request Successfully' };
    }
  }

  findAllLeaveRequest() {
    return this.leaveRepository.find();
  }

  findLeaveById(id: number) {
    return this.leaveRepository.findOne(id);
  }

  async approveLeave(leaveId: number, adminId:number) {
    //    get approval user
    const adminData = await this.adminRepository.findOne(adminId);
    const leaveRequestById =await this.leaveRepository.findOne(leaveId);

    if (adminData && leaveRequestById) {

      leaveRequestById.approved = true;
      leaveRequestById.approvedBy = adminData
      return this.leaveRepository.save(leaveRequestById);

    }
  }

     // get approved leave request
     getAllApprovedLeaveRequest(){
      return  this.leaveRepository.find({approved:false})
  }

    // get Not Approved leave request
    getAllUnApprovedLeaveRequest():any {
     return this.leaveRepository.find({where:{approved:false}})
    
  }

  deleteLeaveById(id: number) {
    return this.leaveRepository.delete(id);
  }
}
