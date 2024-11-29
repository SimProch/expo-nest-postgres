export interface TokenProvider {
  currentToken(): string | undefined;
  setToken(value: string | undefined): void;
}

let token: string | undefined = undefined;
const setToken = (value: string | undefined) => (token = value);

export const tokenProvider: TokenProvider = {
  currentToken: () => token,
  setToken,
};
