import { Injectable, Scope } from '@nestjs/common';
import { UserDto, UserUpdateDto } from './user.service.types';
import { IUserDatabaseService } from 'src/data-access/users/interfaces/IUserDatabaseService';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(private readonly _userDatabaseService: IUserDatabaseService) {}

  public async get(id: string): Promise<UserDto> {
    const existingUser = await this._userDatabaseService.findOneById(id);

    return {
      id: existingUser.id,
      email: existingUser.email,
      phoneNumber: existingUser.phone_number,
      cities: existingUser.locations.map((location) => ({
        city: location.city,
        address: {
          postalCode: location.postal_code,
        },
      })),
    };
  }

  public async update(id: string, update: UserUpdateDto): Promise<void> {
    // await this._userDatabaseService.updateOne(id, update);
  }
}
