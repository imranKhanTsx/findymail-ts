import axios from "axios";

interface VerifyEmailParams {
  email: string;
}

interface FindymailConfig {
  apiKey: string;
}

export class FindymailClient {
  private apiKey: string;
  private baseURL = "https://app.findymail.com";

  constructor(config: FindymailConfig) {
    this.apiKey = config.apiKey;
  }

  /**
   * Verify a single email using Findymail API
   */
  async verifyEmail(params: VerifyEmailParams) {
    try {
      const res = await axios.post(`${this.baseURL}/api/verify`, params, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json"
        }
      });
      return res.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "API error");
    }
  }
}
