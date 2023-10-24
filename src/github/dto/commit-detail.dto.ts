import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

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
export class CommitDetailDto {
  @Expose()
  @ApiProperty({ description: 'SHA identifier of commit' })
  sha: string;
  @Expose()
  @ApiProperty({ description: 'Commit information' })
  commit: Commit;
}
