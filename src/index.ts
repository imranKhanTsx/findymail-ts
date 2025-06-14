import {
  Contact,
  FindFromDomainAsyncParams,
  FindFromDomainAsyncResponse,
  FindFromDomainSyncParams,
  FindFromDomainSyncResponse,
  GetLinkedinProfile,
  GetListsResponse,
  GetSavedContacts,
  ListItem,
} from "./findymail.types";

export class FindymailClient {
  private apiKey: string;
  private baseURL = "https://app.findymail.com";

  constructor(config: { apiKey: string }) {
    this.apiKey = config.apiKey;
  }

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${this.apiKey}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || "API error");
    }

    return data as T;
  }

  async verifyEmail(params: { email: string }) {
    return this.request<{
      email: string;
      verified: boolean;
      provider: string;
    }>(`${this.baseURL}/api/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
  }

  async getList() {
    return this.request<GetListsResponse>(`${this.baseURL}/api/lists`, {
      method: "GET",
    });
  }

  async createList(name: string) {
    return this.request<{
      list: ListItem;
    }>(`${this.baseURL}/api/lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
  }

  async updateContactList(
    params: { name: string; isShared: boolean },
    id: number = 3
  ) {
    return this.request(`${this.baseURL}/api/lists/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
  }
  async deleteList(id: number = 3) {
    return this.request(`${this.baseURL}/api/lists/${id}`, {
      method: "DELETE",
    });
  }
  async getSavedContacts(id: number) {
    return this.request<GetSavedContacts>(
      `${this.baseURL}/api/contacts/get/${id}`,
      {
        method: "GET",
      }
    );
  }
  async findFromName(params: {
    name: string;
    domain: string;
    webhook_url?: string | null;
  }) {
    return this.request<{
      contact: {
        name: string;
        email: string;
        domain: string;
      };
    }>(`${this.baseURL}/api/search/name`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
  }

  // Overload 1
  async findFromDomain(
    params: FindFromDomainAsyncParams
  ): Promise<FindFromDomainAsyncResponse>;

  // Overload 2
  async findFromDomain(
    params: FindFromDomainSyncParams
  ): Promise<FindFromDomainSyncResponse>;

  async findFromDomain(
    params: FindFromDomainAsyncParams | FindFromDomainSyncParams
  ) {
    return this.request<
      FindFromDomainAsyncResponse | FindFromDomainSyncResponse
    >(`${this.baseURL}/api/search/domain`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
  }

  async findFromLinkedin(params: {
    linkedin_url: string;
    webhook_url: string | null;
  }) {
    if (params.webhook_url === null) {
      return this.request<Contact>(`${this.baseURL}/api/search/linkedin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
    }
    return this.request<{ payload: Contact }>(
      `${this.baseURL}/api/search/linkedin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      }
    );
  }

  async getLinkedinProfile(params: { linkedin_url: string }) {
    return this.request<GetLinkedinProfile>(
      `${this.baseURL}/api/linkedin/profile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      }
    );
  }
  async findEmployees(params: {
    website: string;
    job_titles: string[];
    count: number;
  }) {
    return this.request<
      [
        {
          name: string;
          linkedinUrl: string;
          companyWebsite: string;
          companyName: string;
          jobTitle: string;
        }
      ]
    >(`${this.baseURL}/api/search/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
  }
  async findPhone(params: { linkedin_url: string }) {
    return this.request<{
      phone: string;
    }>(`${this.baseURL}/api/search/phone`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
  }
  async getRemainingCredits() {
    return this.request<{
      credits: number;
      verifier_credits: number;
    }>(`${this.baseURL}/api/credits`, {
      method: "GET",
    });
  }
}
