import axios, { type AxiosRequestConfig, type ResponseType } from "axios";

export abstract class AbstractApiService {
  private _url: string;

  constructor() {
    this._url = process.env.BACKEND_URI;
  }

  public async get<T>(
    path: string,
    options: AxiosRequestConfig<T>
  ): Promise<T> {
    const resourcePath = `${this._url}${path}`;

    try {
      const request = await axios.get<T>(resourcePath, options);
      return request.data;
    } catch (e) {
      throw new Error(`Get request to ${resourcePath} failed`);
    }
  }

  public async post<T>(
    path: string,
    data: Record<string, any>,
    options: AxiosRequestConfig<T>
  ): Promise<T> {
    const resourcePath = `${this._url}${path}`;

    try {
      const request = await axios.post<T>(resourcePath, data, options);
      return request.data;
    } catch (e) {
      throw new Error(`Pots request to ${resourcePath} failed`);
    }
  }
}
