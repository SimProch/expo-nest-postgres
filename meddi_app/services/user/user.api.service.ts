import { AbstractApiService } from "../api.service";
import { GetUserDataResponse, UpdateUserDataPayload } from "./user.api.types";

export class UserApiService extends AbstractApiService {
  public async getUserData(id: string): Promise<GetUserDataResponse> {
    return await this.get(`user/${id}`);
  }

  public async update(
    id: string,
    params: UpdateUserDataPayload
  ): Promise<void> {
    await this.put(`user/${id}/update`, params);
  }
}
