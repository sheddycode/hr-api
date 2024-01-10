import { RequestLeaveDto } from './dto/create-leave.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Leave Controller')
@ApiBearerAuth()
@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post('/request')
  @UseGuards(AuthGuard()) 
  requestForLeave(@Body() createLeaveDto: RequestLeaveDto) {
    return this.leaveService.requestForLeave(createLeaveDto);
  }

  @Get()
  @UseGuards(AuthGuard()) 
  findAllRequest() {
    return this.leaveService.findAllLeaveRequest();
  }

  @Get(':id')
  @UseGuards(AuthGuard()) 
  findLeaveById(@Param('id') id: string) {
    return this.leaveService.findLeaveById(+id);
  }

  @Post(':leaveId/:adminId')
  @UseGuards(AuthGuard()) 
  approveLeave(@Param('leaveId') leaveId: number,@Param('leaveId') adminId: number) {
    return this.leaveService.approveLeave(+leaveId, adminId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard()) 
  deleteLeaveById(@Param('id') id: string) {
    return this.leaveService.deleteLeaveById(+id);
  }

  @Get('/getApprovedLeaveRequest')
  @UseGuards(AuthGuard()) 
  getApprovedLeaveRequest(){
    return this.leaveService.getAllApprovedLeaveRequest()
  }

  @Get('/getUnApprovedLeaveRequest')
  @UseGuards(AuthGuard()) 
  getUnApprovedLeaveRequest() {
    return this.leaveService.getAllUnApprovedLeaveRequest()
  }

}
