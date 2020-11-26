import {TokenCookie} from './TokenCookie';

export interface LoginResponse {
  succes: boolean;
  message?: string;
  tokenPack?: TokenCookie;
}
