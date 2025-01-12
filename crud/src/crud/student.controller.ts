import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
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

  // Get a student by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id); // Convert id to number
  }

  // Update a student by ID
  @Put(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  // Delete a student by ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
} 