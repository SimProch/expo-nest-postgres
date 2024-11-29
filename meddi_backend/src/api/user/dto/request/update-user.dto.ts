import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UserUpdateRequestDto {
  @ApiProperty({
    name: 'email',
    example: 'email@example.com',
  })
  @IsEmail()
  @IsOptional()
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
  @IsOptional()
  public password: string;

  @ApiProperty({
    name: 'phoneNumber',
    example: '+420123456789',
  })
  @IsPhoneNumber()
  @IsOptional()
  public phoneNumber: string;

  @ApiProperty({
    name: 'postalCode',
    example: '60200',
  })
  @IsPostalCode('any')
  @IsOptional()
  public postalCode: string;

  @ApiProperty({
    name: 'city',
    example: '60200',
  })
  @IsString()
  @IsOptional()
  public city: string;
}
