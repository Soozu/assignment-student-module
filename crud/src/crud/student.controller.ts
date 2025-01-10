import { Controller, Get, Post, Delete, Patch, Body, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
//create a student
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }
//get all students
  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  // Update a student by ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  // Delete a student by ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
} 