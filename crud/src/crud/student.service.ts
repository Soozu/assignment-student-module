import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    // Check if email already exists
    const existingStudent = await this.studentRepository.findOne({
      where: { email: createStudentDto.email }
    });

    if (existingStudent) {
      throw new ConflictException('Email already exists');
    }

    const student = this.studentRepository.create(createStudentDto);
    return this.studentRepository.save(student);
  }

  findAll() {
    return this.studentRepository.find();
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    // Check if email is being updated and if it already exists
    if (updateStudentDto.email && updateStudentDto.email !== student.email) {
      const existingStudent = await this.studentRepository.findOne({
        where: { email: updateStudentDto.email }
      });
      if (existingStudent) {
        throw new ConflictException('Email already exists');
      }
    }

    Object.assign(student, updateStudentDto);
    return this.studentRepository.save(student);
  }

  async remove(id: number) {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    await this.studentRepository.remove(student);
    return { message: `Student with ID ${id} has been deleted` };
  }
} 