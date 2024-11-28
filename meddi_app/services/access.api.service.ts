import { SignInPayload, SignUpPayload } from "@/ctx/session/auth.types";
import { AbstractApiService } from "./api.service";

export class AccessApiService extends AbstractApiService {
  public async signIn(
    params: SignInPayload
  ): Promise<{ access_token: string }> {
    return await this.post<{ access_token: string }>("login", {
      params,
    });
  }

  public async signUp(
    params: SignUpPayload
  ): Promise<{ access_token: string }> {
    console.log("hit");
    const res = await this.post<{ access_token: string }>("register", {
      params,
    });

    return res;
  }
}
