export interface IAuthResponse {
  id: string;
  message: string;
  token: string;
  expiresIn: number;
  role: string;
}
