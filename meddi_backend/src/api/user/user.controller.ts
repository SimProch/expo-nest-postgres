import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserResponseDto } from './dto/response/get-user.dto';
import { UserService } from 'src/modules/user/services/user.service';
import { UserUpdateRequestDto } from './dto/request/update-user.dto';
import { AuthGuard } from 'src/modules/access/guards/auth.guard';

@ApiTags('User')
@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get(':userId')
  @ApiResponse({ status: 200, description: 'User was found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  public async getUser(
    @Param('userId', ParseUUIDPipe) userId: string
  ): Promise<GetUserResponseDto> {
    const user = await this._userService.get(userId);
    return {
      email: user.email,
      phoneNumber: user.phoneNumber,
      cities: user.cities.map((city) => ({
        city: city.city,
        postalCode: city.address.postalCode,
      })),
    };
  }

  @Put(':userId/update')
  @ApiResponse({ status: 204, description: 'User was successfully updated' })
  @ApiResponse({
    status: 400,
    description: 'Incorrect params',
  })
  @HttpCode(204)
  public async login(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() dto: UserUpdateRequestDto
  ): Promise<void> {
    // await this._userService.update(userId, {
    //   email: dto.email,
    //   password: dto.password,
    // });
  }
}
