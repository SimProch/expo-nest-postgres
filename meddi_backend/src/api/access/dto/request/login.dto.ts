import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    name: 'email',
    example: 'email@example.com',
  })
  @IsEmail()
  public email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 0,
  })
  @ApiProperty({
    name: 'password',
    example: 'hunter2',
  })
  public password: string;
}
