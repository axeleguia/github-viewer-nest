import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosError, AxiosResponse } from 'axios';
import { of, throwError } from 'rxjs';
import { Response } from '../../commons/dto/response';
import { CommitDetailDto } from '../dto/commit-detail.dto';
import { CommitDto } from '../dto/commit.dto';
import { RepositoryDto } from '../dto/repository.dto';
import { GitHubException } from '../exception/github.exception';
import { GitHubService } from './github.service';

describe('GitHubService', () => {
  let gitHubService: GitHubService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GitHubService,
        {
          provide: HttpService,
          useValue: {},
        },
      ],
    }).compile();
    gitHubService = module.get<GitHubService>(GitHubService);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('getRepos', () => {
    it('should return a list of repositories', async () => {
      const json: RepositoryDto[] = [{ id: 1, name: 'name' }];
      const response: Response<RepositoryDto[]> = {
        data: json,
        pagination: {
          prev: null,
          next: null,
          first: null,
          last: null,
        },
      };
      const axiosResponse: AxiosResponse = {
        data: json,
        status: 200,
        statusText: '',
        headers: {},
        config: undefined,
      };
      httpService.get = jest.fn().mockReturnValue(of(axiosResponse));
      const result = await gitHubService.getRepos('owner', 1, 30);
      expect(result).toEqual(response);
    });
    it('should thrown an GitHubException', async () => {
      const axiosResponse: AxiosResponse = {
        data: {
          message: 'message',
          documentation_url: 'documentation_url',
        },
        status: 500,
        statusText: '',
        headers: {},
        config: undefined,
        request: {},
      };
      const axiosError: AxiosError = {
        isAxiosError: true,
        toJSON: function (): object {
          throw new Error('Function not implemented.');
        },
        name: '',
        message: '',
        response: axiosResponse,
      };
      httpService.get = jest.fn().mockReturnValue(throwError(() => axiosError));
      gitHubService.getRepos('owner', 1, 30).catch((error) => {
        expect(error).toBeInstanceOf(GitHubException);
      });
    });
  });

  describe('getRepoCommits', () => {
    it('should return a list of repository commits', async () => {
      const json: CommitDto[] = [
        {
          sha: '47ab069070c043c54c46f8ef9b37b14a25857939',
          commit: {
            author: {
              name: 'Angular Robot',
              email: 'angular-robot@google.com',
              date: new Date('2023-10-23T16:28:24.000Z'),
            },
            message:
              'docs: update Angular CLI help [main] (#52330)\n\nUpdated Angular CLI help contents.\n\nCloses #52281\n\nPR Close #52330',
          },
          committer: {
            login: 'dylhunn',
            avatar_url: 'https://avatars.githubusercontent.com/u/7135246?v=4',
          },
          html_url:
            'https://github.com/angular/angular/commit/47ab069070c043c54c46f8ef9b37b14a25857939',
        },
      ];
      const response: Response<CommitDto[]> = {
        data: json,
        pagination: {
          prev: null,
          next: null,
          first: null,
          last: null,
        },
      };
      const axiosResponse: AxiosResponse = {
        data: json,
        status: 200,
        statusText: '',
        headers: {},
        config: undefined,
      };
      httpService.get = jest.fn().mockReturnValue(of(axiosResponse));
      const result = await gitHubService.getRepoCommits(
        'owner',
        'angular',
        1,
        30,
      );
      expect(result).toEqual(response);
    });
    it('should thrown an GitHubException', async () => {
      const axiosResponse: AxiosResponse = {
        data: {
          message: 'message',
          documentation_url: 'documentation_url',
        },
        status: 500,
        statusText: '',
        headers: {},
        config: undefined,
        request: {},
      };
      const axiosError: AxiosError = {
        isAxiosError: true,
        toJSON: function (): object {
          throw new Error('Function not implemented.');
        },
        name: '',
        message: '',
        response: axiosResponse,
      };
      httpService.get = jest.fn().mockReturnValue(throwError(() => axiosError));
      gitHubService.getRepoCommits('owner', 'angular', 1, 30).catch((error) => {
        expect(error).toBeInstanceOf(GitHubException);
      });
    });
  });

  describe('getRepoCommitDetails', () => {
    it('should return a repository commit details', async () => {
      const response: CommitDetailDto = {
        sha: '47ab069070c043c54c46f8ef9b37b14a25857939',
        commit: {
          author: {
            name: 'Angular Robot',
            email: 'angular-robot@google.com',
            date: new Date('2023-10-23T16:28:24.000Z'),
          },
          message: 'docs: update Angular CLI help [main] (#52330)',
        },
      };
      const axiosResponse: AxiosResponse = {
        data: response,
        status: 200,
        statusText: '',
        headers: {},
        config: undefined,
      };
      httpService.get = jest.fn().mockReturnValue(of(axiosResponse));
      const result = await gitHubService.getRepoCommitDetails(
        'owner',
        'angular',
        'ce6208a88edc13383a630756a3cac1a4bc261f2f',
      );
      expect(result).toEqual(response);
    });
    it('should thrown an GitHubException', async () => {
      const axiosResponse: AxiosResponse = {
        data: {
          message: 'message',
          documentation_url: 'documentation_url',
        },
        status: 500,
        statusText: '',
        headers: {},
        config: undefined,
        request: {},
      };
      const axiosError: AxiosError = {
        isAxiosError: true,
        toJSON: function (): object {
          throw new Error('Function not implemented.');
        },
        name: '',
        message: '',
        response: axiosResponse,
      };
      httpService.get = jest.fn().mockReturnValue(throwError(() => axiosError));
      gitHubService
        .getRepoCommitDetails(
          'owner',
          'angular',
          'ce6208a88edc13383a630756a3cac1a4bc261f2f',
        )
        .catch((error) => {
          expect(error).toBeInstanceOf(GitHubException);
        });
    });
  });
});
