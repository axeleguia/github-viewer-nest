import { Test, TestingModule } from '@nestjs/testing';
import { throwError } from 'rxjs';
import { GitHubException } from '../exception/github.exception';
import { GitHubService } from '../service/github.service';
import { GitHubController } from './github.controller';

describe('GitHubController', () => {
  let gitHubController: GitHubController;
  let gitHubService: GitHubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GitHubController],
      providers: [
        {
          provide: GitHubService,
          useValue: {},
        },
      ],
    }).compile();
    gitHubController = module.get<GitHubController>(GitHubController);
    gitHubService = module.get<GitHubService>(GitHubService);
  });

  describe('getRepos', () => {
    it('should return 200', async () => {
      gitHubService.getRepos = jest.fn().mockResolvedValue([]);
      const result = await gitHubController.getRepos('owner', 1, 30);
      expect(result).toEqual([]);
    });
    it('should return 500', async () => {
      const exception: GitHubException = {
        message: '',
        documentation_url: '',
        status: '',
        name: '',
      };
      gitHubService.getRepos = jest
        .fn()
        .mockResolvedValue(throwError(() => exception));
      gitHubController.getRepos('owner', 1, 30).catch((error) => {
        expect(error).toBeInstanceOf(GitHubException);
      });
    });
  });

  describe('getRepoCommits', () => {
    it('should return 200', async () => {
      gitHubService.getRepoCommits = jest.fn().mockResolvedValue([]);
      const result = await gitHubController.getRepoCommits(
        'owner',
        'angular',
        1,
        30,
      );
      expect(result).toEqual([]);
    });
    it('should return 500', async () => {
      const exception: GitHubException = {
        message: '',
        documentation_url: '',
        status: '',
        name: '',
      };
      gitHubService.getRepoCommits = jest
        .fn()
        .mockResolvedValue(throwError(() => exception));
      gitHubController
        .getRepoCommits('owner', 'angular', 1, 30)
        .catch((error) => {
          expect(error).toBeInstanceOf(GitHubException);
        });
    });
  });

  describe('getRepoCommits', () => {
    it('should return 200', async () => {
      gitHubService.getRepoCommitDetails = jest.fn().mockResolvedValue([]);
      const result = await gitHubController.getRepoCommitDetails(
        'owner',
        'angular',
        'sha',
      );
      expect(result).toEqual([]);
    });
    it('should return 500', async () => {
      const exception: GitHubException = {
        message: '',
        documentation_url: '',
        status: '',
        name: '',
      };
      gitHubService.getRepoCommitDetails = jest
        .fn()
        .mockResolvedValue(throwError(() => exception));
      gitHubController
        .getRepoCommitDetails('owner', 'angular', 'sha')
        .catch((error) => {
          expect(error).toBeInstanceOf(GitHubException);
        });
    });
  });
});
