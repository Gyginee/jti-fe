import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { appStore } from '../stores';

class ApiClient {
  private axiosInstance: AxiosInstance;
  private readonly timeout: number = 30000;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: '',
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // this.axiosInstance.interceptors.request.use(
    //   (config) => {
    //     appStore.setLoading(true);
    //     return config;
    //   },
    //   (error) => {
    //     appStore.setLoading(false);
    //     return Promise.reject(error);
    //   },
    // );

    // this.axiosInstance.interceptors.response.use(
    //   (response) => {
    //     appStore.setLoading(false);
    //     return response;
    //   },
    //   (error) => {
    //     appStore.setLoading(false);
    //     return Promise.reject(error);
    //   },
    // );
  }

  public setBaseUrl(baseUrl: string) {
    this.axiosInstance.defaults.baseURL = baseUrl;
    appStore.setBaseUrl(baseUrl);
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T | null> {
    console.log('calling...', this.axiosInstance.defaults.baseURL + url);
    try {
      const response = await this.axiosInstance.get(url, config);
      return response.data as T;
    } catch (error: any) {
      this.handleError(error);
      return null;
    } finally {
    }
  }

  public async post<T, U>(
    url: string,
    params?: U | any,
    config?: AxiosRequestConfig,
  ): Promise<T | null> {
    try {
      console.log('calling...', this.axiosInstance.defaults.baseURL + url);
      if (params) {
        console.log('Params:\n' + JSON.stringify(params, null, 2));
        params = {
          ...params,
          currentUserId: appStore.currentUser?.id || 0,
        };
      } else {
        params = {
          currentUserId: appStore.currentUser?.id || 0,
        };
      }
      const response = await this.axiosInstance.post(url, params, config);
      return response.data as T;
    } catch (error: any) {
      this.handleError(error);
      return null;
    } finally {
    }
  }

  public async put<T, U>(
    url: string,
    params?: U,
    config?: AxiosRequestConfig,
  ): Promise<T | null> {
    try {
      console.log('calling...', this.axiosInstance.defaults.baseURL + url);
      const response = await this.axiosInstance.put(url, params, config);
      return response.data as T;
    } catch (error: any) {
      this.handleError(error);
      return null;
    } finally {
    }
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T | null> {
    try {
      console.log('calling...', this.axiosInstance.defaults.baseURL + url);
      const response = await this.axiosInstance.delete(url, config);
      return response.data as T;
    } catch (error: any) {
      this.handleError(error);
      return null;
    } finally {
    }
  }

  private handleError(error: AxiosError) {
    console.log(JSON.stringify(error, null, 2));

    if (error.response) {
      const json: any = error.response.data;
      if (json) {
        console.log(json);
        if (json.message) {
          appStore.setMessage({
            type: 'error',
            content: json.message,
            timestamp: new Date().getMilliseconds(),
          });
        }
      } else {
        appStore.setMessage({
          type: 'error',
          content: `${error.name}: ${error.message}`,
          timestamp: new Date().getMilliseconds(),
        });
      }
    } else {
      const message = `code: ${error.code}\nmessage: ${error.message}`;

      if (error.message.includes(`${this.timeout}ms`)) {
        appStore.setMessage({
          type: 'error',
          content: `Mạng yếu, vui lòng thử lại sau\n\n${message}`,
          timestamp: new Date().getMilliseconds(),
        });
      } else {
        appStore.setMessage({
          type: 'error',
          content: 'Đã có lỗi xảy ra ở server, vui lòng thử lại sau.',
          timestamp: new Date().getMilliseconds(),
        });
      }
    }
  }
}

const apiClient = new ApiClient();
export default apiClient;
