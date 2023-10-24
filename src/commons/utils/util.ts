import { Pagination } from './../../commons/dto/pagination';

export function parsePagination(linkHeader?: string): Pagination {
  const pagination = { next: null, prev: null, first: null, last: null };
  if (!linkHeader) return pagination;
  const links = linkHeader.split(', ');
  for (const link of links) {
    const { 1: page, 3: rel } = link.match(
      /page=(\d+)&per_page=(\d+)>; rel="(\w+)"/,
    );
    pagination[rel] = parseInt(page);
  }
  return pagination;
}
