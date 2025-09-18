export enum Lead {
  LINKEDIN = "LINKEDIN",
  INDEED = "INDEED",
  GLASSDOOR = "GLASSDOOR",
}

export enum Status {
  SENT = "SENT",
  REPLIED = "REPLIED",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export type Resume = {
  id: string;
  content: string;
  dateCreated: string;
  version?: number;
};

export type CoverLetterTemplate = {
  id: string;
  title: string;
  content: string;
  dateCreated: string;
};

export type Job = {
  id: string;
  role: string;
  description: string;
  company: string;
  location: string;
  resumePosted: Resume | null;
  dateCreated: string;
  dateApprovedRejected: string;
  lead: Lead | "";
  salaryMin: number | "";
  salaryMax: number | "";
  status?: Status;
  isExternalWebsite: boolean;
  withGithubLink: boolean;
  withLinkedinLink: boolean;
  withPortfolioLink: boolean;
  withCoverLetter: boolean;
  referenceLink: string;
};
