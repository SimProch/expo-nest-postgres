import { TokenProvider } from "./token-provider";
import axios, { type AxiosRequestConfig } from "axios";

export abstract class AbstractApiService {
  private _url: string;

  constructor(private readonly tokenProvider: TokenProvider) {
    // @ts-expect-error to be defined
    this._url = process.env.EXPO_PUBLIC_BACKEND_URI;
  }

  public async get<T>(
    path: string,
    options: AxiosRequestConfig<T> = {}
  ): Promise<T> {
    const resourcePath = `${this._url}${path}`;
    const token = this.tokenProvider.currentToken();

    try {
      const request = await axios.get<T>(resourcePath, {
        ...options,
        headers: {
          ...options.headers,
          ...(token
            ? { Authorization: `Bearer ${this.tokenProvider.currentToken()}` }
            : {}),
        },
      });
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
    const resourcePath = `${this._url}${path}`;
    const token = this.tokenProvider.currentToken();

    try {
      const request = await axios.post<T>(resourcePath, data, {
        ...options,
        headers: {
          ...options.headers,
          ...(token
            ? { Authorization: `Bearer ${this.tokenProvider.currentToken()}` }
            : {}),
        },
      });
      return request.data;
    } catch (e) {
      console.error(e);
      throw new Error(`Pots request to ${resourcePath} failed`);
    }
  }

  public async put(
    path: string,
    data: Record<string, unknown>,
    options: AxiosRequestConfig = {}
  ): Promise<void> {
    const resourcePath = `${this._url}${path}`;
    const token = this.tokenProvider.currentToken();

    try {
      await axios.put(resourcePath, data, {
        headers: {
          ...options.headers,
          ...(token
            ? { Authorization: `Bearer ${this.tokenProvider.currentToken()}` }
            : {}),
        },
      });
    } catch (e) {
      console.error(e);
      throw new Error(`Pots request to ${resourcePath} failed`);
    }
  }
}
