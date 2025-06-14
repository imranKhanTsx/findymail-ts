// get list response
export interface ListItem {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  shared_with_team: boolean;
  is_owner: boolean;
}

export interface GetListsResponse {
  lists: ListItem[];
}

//get saved contacts response

export interface GetSavedContacts {
  draw: number;
  recordsTotal: number;
  recordsFiltered: number;
  data: SavedData[];
}

export interface SavedData {
  id: number;
  name: string;
  email: string;
  linkedin_url: string;
  company: string;
  job_title: string;
}

// findFromDomain response

export interface Contact {
  name: string;
  email: string;
  domain: string;
}

interface FindFromDomainBaseParams {
  domain: string;
  roles: string[];
}

export interface FindFromDomainAsyncParams extends FindFromDomainBaseParams {
  webhook_url: string;
}

export interface FindFromDomainSyncParams extends FindFromDomainBaseParams {
  webhook_url?: null | undefined;
}

export interface FindFromDomainAsyncResponse {
  payload: {
    contacts: Contact[];
  };
}

export interface FindFromDomainSyncResponse {
  contacts: Contact[];
}

// getLinkedinProfile response

export interface GetLinkedinProfile {
  linkedInId: string;
  fullName: string;
  username: string;
  headline: string;
  jobTitle: string;
  summary: string;
  city: string;
  region: string;
  country: string;
  companyLinkedinUrl: string;
  companyName: string;
  companyWebsite: string;
  isPremium: boolean;
  skills: any[];
  jobs: {
    jobTitle: string;
    companyName: string;
    companyWebsite: string;
    jobDescription: string;
    startDate: Date;
    endDate: string;
  }[];
}
