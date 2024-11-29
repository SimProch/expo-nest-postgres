import { AccessApiService } from "./access/access.api.service";
import { tokenProvider } from "./token-provider";
import { UserApiService } from "./user/user.api.service";

export const accessApiService = new AccessApiService(tokenProvider);
export const userApiService = new UserApiService(tokenProvider);
