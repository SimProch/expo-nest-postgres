import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterRequestDto } from './dto/request/register.dto';
import { LoginRequestDto } from './dto/request/login.dto';
import { AccessService } from 'src/modules/access/services/access.service';
import { TokenResponseDto } from './dto/response/token.dto';

@Controller('registration')
export class AccessController {
  constructor(private readonly _accessService: AccessService) {}

  @Post('register')
  public async registerNewUser(
    @Body() dto: RegisterRequestDto,
  ): Promise<TokenResponseDto> {
    const token = await this._accessService.registerNewUser({
      email: dto.email,
      password: dto.password,
      phoneNumber: dto.phoneNumber,
    });

    return {
      access_token: token.access_token,
    };
  }

  @Post('login')
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
