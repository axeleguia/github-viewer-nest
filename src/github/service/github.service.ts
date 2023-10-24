import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { plainToInstance } from 'class-transformer';
import { catchError, firstValueFrom } from 'rxjs';
import { Response } from '../../commons/dto/response';
import { CommitDetailDto } from '../dto/commit-detail.dto';
import { CommitDto } from '../dto/commit.dto';
import { RepositoryDto } from '../dto/repository.dto';
import { parsePagination } from './../../commons/utils/util';
import { GitHubException } from '../exception/github.exception';

@Injectable()
export class GitHubService {
  private readonly logger = new Logger(GitHubService.name);

  private readonly header = {
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  };

  constructor(private readonly httpService: HttpService) {}

  async getRepos(
    owner: string,
    page: number,
    perPage: number,
  ): Promise<Response<RepositoryDto[]>> {
    const { data, headers } = await firstValueFrom(
      this.httpService
        .get<RepositoryDto[]>(
          `${process.env.GITHUB_API}/users/${owner}/repos`,
          {
            headers: this.header,
            params: { page: page, per_page: perPage },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(
              'GitHubService#getRepos - Failed to retrieve repositories: ',
              error.response.data['message'],
            );
            throw new GitHubException(
              error.response.data['message'],
              error.response.data['documentation_url'],
              error.response.statusText,
            );
          }),
        ),
    );
    return {
      data: plainToInstance(RepositoryDto, data, {
        enableImplicitConversion: true,
      }),
      pagination: parsePagination(headers.link),
    };
  }

  async getRepoCommits(
    owner: string,
    repository: string,
    page: number,
    perPage: number,
  ): Promise<Response<CommitDto[]>> {
    const { data, headers } = await firstValueFrom(
      this.httpService
        .get<CommitDto[]>(
          `${process.env.GITHUB_API}/repos/${owner}/${repository}/commits`,
          {
            headers: this.header,
            params: { page: page, per_page: perPage },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(
              'GitHubService#getRepoCommits - Failed to retrieve repository commits: ',
              error.response.data['message'],
            );
            throw new GitHubException(
              error.response.data['message'],
              error.response.data['documentation_url'],
              error.response.statusText,
            );
          }),
        ),
    );
    return {
      data: plainToInstance(CommitDto, data, {
        enableImplicitConversion: true,
      }),
      pagination: parsePagination(headers.link),
    };
  }

  async getRepoCommitDetails(
    owner: string,
    repository: string,
    commit_sha: string,
  ): Promise<CommitDetailDto> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `${process.env.GITHUB_API}/repos/${owner}/${repository}/commits/${commit_sha}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(
              'GitHubService#getRepoCommitDetails - Failed to retrieve repository commit details: ',
              error.response.data['message'],
            );
            throw new GitHubException(
              error.response.data['message'],
              error.response.data['documentation_url'],
              error.response.statusText,
            );
          }),
        ),
    );
    return plainToInstance(CommitDetailDto, data, {
      enableImplicitConversion: true,
    });
  }
}
