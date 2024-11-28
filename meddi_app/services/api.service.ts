import axios, { type AxiosRequestConfig } from "axios";

export abstract class AbstractApiService {
  private _url: string;

  constructor() {
    // @ts-expect-error to be defined
    this._url = process.env.EXPO_PUBLIC_BACKEND_URI;
  }

  public async get<T>(
    path: string,
    options: AxiosRequestConfig<T>
  ): Promise<T> {
    const resourcePath = `${this._url}${path}`;
    console.log(this._url);

    try {
      const request = await axios.get<T>(resourcePath, options);
      return request.data;
    } catch (e) {
      console.error(e);
      throw new Error(`Get request to ${resourcePath} failed`);
    }
  }

  public async post<T>(
    path: string,
    data: Record<string, unknown>,
    options: AxiosRequestConfig<T> = {}
  ): Promise<T> {
    console.log(this._url);
    const resourcePath = `${this._url}${path}`;

    try {
      const request = await axios.post<T>(resourcePath, data, options);
      return request.data;
    } catch (e) {
      console.error(e);
      throw new Error(`Pots request to ${resourcePath} failed`);
    }
  }
}
