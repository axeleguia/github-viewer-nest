import { Module } from '@nestjs/common';
import { GitHubController } from './controller/github.controller';
import { GitHubService } from './service/github.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [GitHubController],
  providers: [GitHubService],
})
export class GitHubModule {}
