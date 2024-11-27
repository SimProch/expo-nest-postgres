import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsStrongPassword } from 'class-validator';

export class RegisterRequestDto {
  @IsEmail()
  @ApiProperty({
    name: 'email',
    example: 'email@example.com',
  })
  email: string;

  @IsStrongPassword()
  @ApiProperty({
    name: 'password',
    example: 'hunter2',
  })
  password: string;

  @IsPhoneNumber()
  @ApiProperty({
    name: 'phoneNumber',
    example: '+420123456789',
  })
  phoneNumber: string;
}
