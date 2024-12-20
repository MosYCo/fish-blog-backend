import { GithubIssues, GithubRepo, ListIssuesParams } from '../types/github';
import { RequestInterface } from '@octokit/types';
export class Github {
  private api: {
    request: RequestInterface<object>;
  };

  constructor(private readonly token: string) {
    import('@octokit/rest').then((module) => {
      this.api = new module.Octokit({
        auth: this.token,
      });
    });
  }

  /**
   * 获取仓库详情
   * @param owner 仓库拥有者
   * @param repo 仓库名称
   * @returns
   */
  async getRepoInfo(
    owner: string,
    repo: string,
  ): Promise<GithubRepo | undefined> {
    const res = await this.api.request('GET /repos/{owner}/{repo}', {
      owner,
      repo,
    });
    if (res.status === 200) {
      return res.data;
    }
  }

  /**
   * 获取仓库Issues列表
   * @param params 查询参数
   * @returns
   */
  async getRepoIssuesList(params: ListIssuesParams): Promise<GithubIssues[]> {
    const res = await this.api.request('GET /repos/{owner}/{repo}/issues', {
      ...params,
    });
    if (res.status === 200) {
      return res.data;
    }
  }
}
