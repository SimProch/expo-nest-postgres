import { Injectable, Scope } from '@nestjs/common';
import { Token, UserLogin, UserRegistration } from './access.service.types';
import * as crypto from 'argon2';
import { IUserDatabaseService } from 'src/data-access/users/interfaces/IUserService';
import { JwtService } from '@nestjs/jwt';
import { DBUser } from 'db/schema/users';

@Injectable({ scope: Scope.REQUEST })
export class AccessService {
  constructor(
    private readonly _userDatabaseService: IUserDatabaseService<DBUser>,
    private readonly _jwtService: JwtService,
  ) {}

  public async registerNewUser(props: UserRegistration): Promise<Token> {
    const existingUser = await this._userDatabaseService.findOne(props.email);
    if (existingUser) {
      throw new Error('There was an error registering the user');
    }

    const hashedPassword = await this._createHashedPassword(props.password);
    const id = await this._userDatabaseService.createOne({
      email: props.email,
      password_hash: hashedPassword,
      phone_number: props.phoneNumber,
    });

    return this._generateAccessToken(id, props.email);
  }

  public async login(props: UserLogin): Promise<Token> {
    const existingUser = await this._userDatabaseService.findOne(props.email);
    if (!existingUser) {
      throw new Error('There was an error with login');
    }

    const doPasswordsMatch = await this._comparePasswords(
      existingUser.password_hash,
      props.password,
    );

    if (!doPasswordsMatch) {
      throw new Error('There was an error with login');
    }

    return this._generateAccessToken(existingUser.id, existingUser.email);
  }

  private async _createHashedPassword(password: string): Promise<string> {
    const hash = await crypto.hash(password);
    return hash;
  }

  private async _comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const result = await crypto.verify(hashedPassword, password);
    return result;
  }

  private async _generateAccessToken(
    id: string,
    email: string,
  ): Promise<Token> {
    const payload = {
      sub: id,
      username: email,
    };

    const accessToken = await this._jwtService.signAsync(payload);

    return { access_token: accessToken };
  }
}
