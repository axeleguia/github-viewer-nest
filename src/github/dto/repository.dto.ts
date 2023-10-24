import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RepositoryDto {
  @Expose()
  @ApiProperty({ description: 'Identifier of the repository' })
  id: number;
  @Expose()
  @ApiProperty({ description: 'Name of the repository' })
  name: string;
}
