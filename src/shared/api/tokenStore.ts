export interface AccessTokenStore {
  getAccessToken(): string | null;
  setAccessToken(token: string | null): void;
  clearAccessToken(): void;
}

export const createAccessTokenStore = (): AccessTokenStore => {
  let accessToken: string | null = null;

  return {
    getAccessToken: () => accessToken,
    setAccessToken: (token: string | null) => {
      accessToken = token;
    },
    clearAccessToken: () => {
      accessToken = null;
    },
  };
};
