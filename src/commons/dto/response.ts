import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from './pagination';

export class Response<T> {
  @ApiProperty({ description: 'Data information' })
  data: T;
  @ApiProperty({ description: 'Pagination information' })
  pagination: Pagination;
  constructor(data: T, pagination: Pagination) {
    this.data = data;
    this.pagination = pagination;
  }
}
