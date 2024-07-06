import { AxiosInstance } from 'axios';
export class ApiClient {
  constructor(private http: AxiosInstance) {}

  async getAllEntries() {
    const result = await this.http.get('/load');
    return result.data;
  }
}
