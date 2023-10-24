import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const GITHUB_TOKEN =
      request.headers['github-token'] || process.env.GITHUB_TOKEN;
    request.headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    return next.handle();
  }
}
