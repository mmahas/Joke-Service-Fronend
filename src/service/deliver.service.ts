import axios, { AxiosInstance, AxiosError } from 'axios';
import { getAuthorizationHeader } from '../lib/getAuthorizationHeader';

export class DeliverService {
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
      const response = await this.instance.get('joke-type');
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
    }
  }

  public async getJokes(): Promise<any> {
    try {
      const response = await this.instance.get('joke');
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
    }
  }

  public async getJokesByType(type: string | undefined): Promise<any> {
    try {
      const response = await this.instance.get(`joke/type/${type}`);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
    }
  }


}
