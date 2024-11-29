import { SignInPayload, SignUpPayload } from "@/ctx/session/auth.types";
import { AbstractApiService } from "./api.service";

export class AccessApiService extends AbstractApiService {
  public async signIn(
    params: SignInPayload
  ): Promise<{ access_token: string }> {
    return await this.post<{ access_token: string }>("access/login", params);
  }

  public async signUp(
    params: SignUpPayload
  ): Promise<{ access_token: string }> {
    const res = await this.post<{ access_token: string }>(
      "access/register",
      params
    );

    return res;
  }
}
