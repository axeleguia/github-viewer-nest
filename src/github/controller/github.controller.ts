import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommitDetailDto } from '../dto/commit-detail.dto';
import { GitHubException } from '../exception/github.exception';
import { GitHubService } from '../service/github.service';
import { Response } from '../../commons/dto/response';
import { RepositoryDto } from '../dto/repository.dto';
import { CommitDto } from '../dto/commit.dto';

@Controller('github')
@ApiTags('github')
export class GitHubController {
  private readonly logger = new Logger(GitHubController.name);

  constructor(private readonly githubService: GitHubService) {}

  @Get('repos/:owner')
  @ApiOperation({ summary: 'Returns repositories for given owner' })
  @ApiResponse({
    status: 200,
    description: 'Repositories found for given owner',
    type: Response<RepositoryDto[]>,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: GitHubException,
  })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'perPage', required: false })
  async getRepos(
    @Param('owner') owner: string,
    @Query('page') page?: number,
    @Query('perPage') perPage?: number,
  ) {
    this.logger.log(
      `GitHubController#getRepos - START - Get All Repositories. owner=${owner}, page=${page}, perPage=${perPage}`,
    );
    const response = await this.githubService.getRepos(owner, page, perPage);
    this.logger.log(
      `GitHubController#getRepos - END - Get All Repositories. owner=${owner}, page=${page}, perPage=${perPage}, response=${JSON.stringify(
        response,
      )}`,
    );
    return response;
  }

  @Get('repos/:owner/:repository')
  @ApiOperation({ summary: 'Returns commits for a given repository' })
  @ApiResponse({
    status: 200,
    description: 'Commits found for given repository',
    type: Response<CommitDto[]>,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: GitHubException,
  })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'perPage', required: false })
  async getRepoCommits(
    @Param('owner') owner: string,
    @Param('repository') repository: string,
    @Query('page') page?: number,
    @Query('perPage') perPage?: number,
  ) {
    this.logger.log(
      `GitHubController#getRepoCommits - START - Get All Repo commits. owner=${owner}, repository=${repository}, page=${page}, perPage=${perPage}`,
    );
    const response = await this.githubService.getRepoCommits(
      owner,
      repository,
      page,
      perPage,
    );
    this.logger.log(
      `GitHubController#getRepoCommits - END - Get All Repo commits. owner=${owner}, repository=${repository}, page=${page}, perPage=${perPage}, response=${JSON.stringify(
        response,
      )}`,
    );
    return response;
  }

  @Get('repos/:owner/:repository/:commit_sha')
  @ApiOperation({ summary: 'Returns details for a given commit' })
  @ApiResponse({
    status: 200,
    description: 'Commit detail found for given sha',
    type: CommitDetailDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: GitHubException,
  })
  async getRepoCommitDetails(
    @Param('owner') owner: string,
    @Param('repository') repository: string,
    @Param('commit_sha') commit_sha: string,
  ) {
    this.logger.log(
      `GitHubController#getRepoCommitDetails - START - Get All Repo commits. owner=${owner}, repository=${repository}, commit_sha=${commit_sha}`,
    );
    const response = await this.githubService.getRepoCommitDetails(
      owner,
      repository,
      commit_sha,
    );
    this.logger.log(
      `GitHubController#getRepoCommitDetails - END - Get All Repo commits. owner=${owner}, repository=${repository}, commit_sha=${commit_sha}, response=${JSON.stringify(
        response,
      )}`,
    );
    return response;
  }
}
