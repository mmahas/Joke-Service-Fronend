import axios, { AxiosInstance, AxiosError } from 'axios';
import { getAuthorizationHeader } from '../lib/getAuthorizationHeader';

export class SubmitService {
  protected readonly instance: AxiosInstance;

  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 3000,
      timeoutErrorMessage: 'Time out!',
    });
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

  public async getJokeTypes(): Promise<any> {
    try {
      const response = await this.instance.get('/joke-type', {
        headers: getAuthorizationHeader(),
      });
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
    }
  }

  public async submitJokes(payload: any): Promise<{ data: any; status: number }> {
    try {
      const response = await this.instance.post('/', payload);
      return { data: response.data, status: response.status };
    } catch (error) {
      this.handleError(error as AxiosError);
    }
  }
}
