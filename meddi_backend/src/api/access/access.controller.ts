import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RegisterRequestDto } from './dto/request/register.dto';
import { LoginRequestDto } from './dto/request/login.dto';
import { AccessService } from 'src/modules/access/services/access.service';
import { TokenResponseDto } from './dto/response/token.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Access')
@Controller('access')
export class AccessController {
  constructor(private readonly _accessService: AccessService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'User was successfully registered' })
  @ApiResponse({
    status: 409,
    description: 'There was an issue when creating the user',
  })
  @HttpCode(201)
  public async registerNewUser(@Body() dto: RegisterRequestDto): Promise<TokenResponseDto> {
    const token = await this._accessService.registerNewUser({
      email: dto.email,
      password: dto.password,
      phoneNumber: dto.phoneNumber,
      cities: dto.cities,
    });

    return {
      access_token: token.access_token,
    };
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'User was successfully logged in' })
  @ApiResponse({
    status: 400,
    description: 'Incorrect credentials',
  })
  @HttpCode(200)
  public async login(@Body() dto: LoginRequestDto): Promise<TokenResponseDto> {
    const token = await this._accessService.login({
      email: dto.email,
      password: dto.password,
    });

    return {
      access_token: token.access_token,
    };
  }
}
