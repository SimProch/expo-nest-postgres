import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    name: 'email',
    example: 'email@example.com',
  })
  @IsEmail()
  email: string;

  @IsStrongPassword()
  @ApiProperty({
    name: 'password',
    example: 'hunter2',
  })
  password: string;
}
