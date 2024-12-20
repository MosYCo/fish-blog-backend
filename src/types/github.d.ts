import { Endpoints } from '@octokit/types';

export type GithubRepo =
  Endpoints['GET /repos/{owner}/{repo}']['response']['data'];

export type GithubIssues =
  Endpoints['GET /repos/{owner}/{repo}/issues/{issue_number}']['response']['data'];

export type ListIssuesParams =
  Endpoints['GET /repos/{owner}/{repo}/issues']['parameters'];
