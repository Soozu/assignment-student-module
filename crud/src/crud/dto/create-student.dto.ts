import { IsString, IsEmail, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty({ message: 'First name is required' })
  @IsString()
  firstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @IsString()
  lastName: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Enrollment date is required' })
  @IsDateString()
  enrollmentDate: Date;
}