import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsPostalCode, IsString, IsStrongPassword } from 'class-validator';

export class RegisterRequestDto {
  @IsEmail()
  @ApiProperty({
    name: 'email',
    example: 'email@example.com',
  })
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

  @ApiProperty({
    name: 'phoneNumber',
    example: '+420123456789',
  })
  @IsPhoneNumber()
  public phoneNumber: string;

  @ApiProperty({
    name: 'postalCode',
    example: '60200',
  })
  @IsPostalCode('any')
  public postalCode: string;

  @ApiProperty({
    name: 'city',
    example: '60200',
  })
  @IsString()
  public city: string;
}
