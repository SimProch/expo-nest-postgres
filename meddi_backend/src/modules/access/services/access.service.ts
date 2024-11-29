import { Injectable, Scope } from '@nestjs/common';
import { Token, UserLogin, UserRegistration } from './access.service.types';
import * as crypto from 'argon2';
import { IUserDatabaseService } from 'src/data-access/users/interfaces/IUserDatabaseService';
import { JwtService } from '@nestjs/jwt';

@Injectable({ scope: Scope.REQUEST })
export class AccessService {
  constructor(
    private readonly _userDatabaseService: IUserDatabaseService,
    private readonly _jwtService: JwtService
  ) {}

  public async registerNewUser(props: UserRegistration): Promise<Token> {
    const existingUser = await this._userDatabaseService.findOneByEmail(props.email);
    if (existingUser) {
      throw new Error('There was an error registering the user');
    }

    const hashedPassword = await this._createHashedPassword(props.password);
    const id = await this._userDatabaseService.createOne({
      email: props.email,
      password_hash: hashedPassword,
      phone_number: props.phoneNumber,
      postal_code: props.postalCode,
      city: props.city,
    });

    return this._generateAccessToken(id, props.email);
  }

  public async login(props: UserLogin): Promise<Token> {
    const existingUser = await this._userDatabaseService.findOneByEmail(props.email);
    if (!existingUser) {
      throw new Error('There was an error with login');
    }

    const doPasswordsMatch = await this._comparePasswords(
      existingUser.password_hash,
      props.password
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

  private async _comparePasswords(hashedPassword: string, password: string): Promise<boolean> {
    const result = await crypto.verify(hashedPassword, password);
    return result;
  }

  private async _generateAccessToken(id: string, email: string): Promise<Token> {
    const payload = {
      sub: id,
      username: email,
    };

    const accessToken = await this._jwtService.signAsync(payload);

    return { access_token: accessToken };
  }
}
