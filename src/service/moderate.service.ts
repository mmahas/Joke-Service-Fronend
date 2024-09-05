import axios, { AxiosInstance, AxiosError } from 'axios';
import { getAuthorizationHeader } from '../lib/getAuthorizationHeader';

export class ModerateService {
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

  public async getNextJoke(): Promise<any> {
    try {
      const response = await this.instance.get('/jokes', {
        headers: getAuthorizationHeader(),
      });
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
    }
  }

  public async updateJoke(id: any, payload: any): Promise<{ data: any; status: number }> {
    try {
      const response = await this.instance.patch(`/joke/${id}`, payload, {
        headers: getAuthorizationHeader(),
      });
      return { data: response.data, status: response.status };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          return { data: error.response.data, status: error.response.status };
        }
      }
      this.handleError(error as AxiosError);
    }
  }

  public async createJokeType(payload: any): Promise<{ data: any; status: number }> {
    try {
      const response = await this.instance.post('/joke-type', payload, {
        headers: getAuthorizationHeader(),
      });
      return { data: response.data, status: response.status };
    } catch (error) {
      this.handleError(error as AxiosError);
    }
  }

  public async deleteJoke(studentId: string): Promise<any> {
    try {
      const response = await this.instance.delete(`joke/${studentId}`, {
        headers: getAuthorizationHeader(),
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          return { data: error.response.data, status: error.response.status };
        }
      }
      this.handleError(error as AxiosError);
    }
  }
}
