import { Pagination } from '../dto/pagination';
import { parsePagination } from './util';

describe('Util', () => {
  describe('parsePagination', () => {
    it('should parse links to pagination class', async () => {
      const pagination: Pagination = {
        prev: 4,
        next: 6,
        last: 21,
        first: 1,
      };
      const links = `
            <https://api.github.com/user/139426/repos?page=4&per_page=10>; rel="prev", 
            <https://api.github.com/user/139426/repos?page=6&per_page=10>; rel="next", 
            <https://api.github.com/user/139426/repos?page=21&per_page=10>; rel="last", 
            <https://api.github.com/user/139426/repos?page=1&per_page=10>; rel="first"
            `;
      const result = parsePagination(links);
      expect(result).toEqual(pagination);
    });
  });
});
