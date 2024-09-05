import axios, { AxiosInstance, AxiosError } from 'axios';
import { getAuthorizationHeader } from '../lib/getAuthorizationHeader';

export class AuthService {
  protected readonly instance: AxiosInstance;
  protected authToken: string | null = null;

  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 3000,
      timeoutErrorMessage: 'Time out!',
    });
  }

  public setAuthToken(token: string | null) {
    this.authToken = token;
  }

  private handleError(error: AxiosError): never {
    // Log the error for developers
    console.error('API Error:', {
      message: error.message,
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });

    // Throw a generic error for the UI
    throw new Error('Something went wrong. Please try again later.');
  }

  public async loginUser(payload: any): Promise<{ accessToken: any }> {
    try {
      const response = await this.instance.post('/login', payload);
      return { accessToken: response.data };
    } catch (error) {
      this.handleError(error as AxiosError);
    }
  }

  public async getUser(_id: string | undefined): Promise<any> {
    try {
      const response = await this.instance.get(`/user/${_id}`, {
        headers: {
          ...getAuthorizationHeader(),
          ...(this.authToken && { Authorization: `Bearer ${this.authToken}` }),
        },
      });
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
    }
  }
}
