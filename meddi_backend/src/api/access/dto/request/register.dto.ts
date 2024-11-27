import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsStrongPassword } from 'class-validator';

export class RegisterRequestDto {
  @IsEmail()
  @ApiProperty({
    name: 'email',
    example: 'email@example.com',
  })
  public email: string;

  @IsStrongPassword()
  @ApiProperty({
    name: 'password',
    example: 'hunter2',
  })
  public password: string;

  @IsPhoneNumber()
  @ApiProperty({
    name: 'phoneNumber',
    example: '+420123456789',
  })
  public phoneNumber: string;
}
