import {
  SignInPayload,
  SignInResponse,
  SignUpPayload,
  SignUpResponse,
} from "./access.api.types";
import { AbstractApiService } from "../api.service";

export class AccessApiService extends AbstractApiService {
  public async signIn(params: SignInPayload): Promise<SignInResponse> {
    return await this.post<SignInResponse>("access/login", params);
  }

  public async signUp(params: SignUpPayload): Promise<SignUpResponse> {
    const res = await this.post<SignUpResponse>("access/register", params);

    return res;
  }
}
