import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
class Committer {
  @Expose()
  @ApiProperty({ description: 'Login name' })
  login: string;
  @Expose()
  @ApiProperty({ description: 'URL avatar' })
  avatar_url: string;
}

@Exclude()
class Author {
  @Expose()
  @ApiProperty({ description: 'Author name' })
  name: string;
  @Expose()
  @ApiProperty({ description: 'Author email' })
  email: string;
  @Expose()
  @ApiProperty({ description: 'Commit date' })
  date: Date;
}

@Exclude()
class Commit {
  @Expose()
  @ApiProperty({ description: 'Commit author' })
  author: Author;
  @Expose()
  @ApiProperty({ description: 'Commit message' })
  message: string;
}

@Exclude()
export class CommitDto {
  @Expose()
  @ApiProperty({ description: 'SHA identifier of commit' })
  sha: string;
  @Expose()
  @ApiProperty({ description: 'Commit information' })
  commit: Commit;
  @Expose()
  @ApiProperty({ description: 'Committer information' })
  committer: Committer;
  @Expose()
  @ApiProperty({ description: 'HTML Url' })
  html_url: string;
}
