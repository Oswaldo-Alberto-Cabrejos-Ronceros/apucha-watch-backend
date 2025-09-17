import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EntityNotFoundError } from 'typeorm';

@Injectable()
export class TypeORMNotFoundInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      catchError((error: unknown) => {
        if (error instanceof EntityNotFoundError) {
          return throwError(() => new NotFoundException(error.message));
        }
        if (error instanceof Error) {
          return throwError(() => error);
        }
        return throwError(() => new Error('Unknown error occurred'));
      }),
    );
  }
}
