import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ListIssuesParams } from './types/github';

@Controller('/github')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/repo')
  async getRepoInfo(
    @Query('owner') owner?: string,
    @Query('repo') repo?: string,
  ) {
    return await this.appService.getRepoInfo(owner, repo);
  }

  @Post('/issues-list')
  async getIssues(
    @Body() body: ListIssuesParams & { repo?: string; owner?: string },
  ) {
    return await this.appService.getIssuesList(body);
  }
}
