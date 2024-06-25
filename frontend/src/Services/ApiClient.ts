import { AxiosInstance } from 'axios';
export class ApiClient {
  constructor(private http: AxiosInstance) {}

  async getAllEntries() {
    const result = await this.http.get('/get_entries');
    return result.data;
  }
}
