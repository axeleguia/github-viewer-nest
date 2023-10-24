export class GitHubException extends Error {
  documentation_url: string;
  status: string;
  constructor(message: string, documentation_url: string, status: string) {
    super(message);
    this.documentation_url = documentation_url;
    this.status = status;
  }
}
