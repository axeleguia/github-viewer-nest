import { ApiProperty } from '@nestjs/swagger';

export class Pagination {
  @ApiProperty({ description: 'Next page' })
  next: number;
  @ApiProperty({ description: 'Previous page' })
  prev: number;
  @ApiProperty({ description: 'Last page' })
  last: number;
  @ApiProperty({ description: 'First page' })
  first: number;
}
