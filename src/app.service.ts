import { Injectable } from '@nestjs/common';
import { GithubIssues, ListIssuesParams } from './types/github';
import { Github } from './core/github';

@Injectable()
export class AppService {
  private api: Github;
  private owner: string;
  private repo: string;

  constructor() {
    this.api = new Github(process.env.GITHUB_TOKEN);
    const split = process.env.BLOG_REPO.split('/');
    if (split.length === 2) {
      this.owner = split[0];
      this.repo = split[1];
    }
  }

  getRepoInfo(owner = this.owner, repo = this.repo) {
    return this.api.getRepoInfo(owner, repo);
  }

  getIssuesList(params: ListIssuesParams): Promise<GithubIssues[]> {
    return this.api.getRepoIssuesList({
      owner: this.owner,
      repo: this.repo,
      ...params,
    });
  }
}
