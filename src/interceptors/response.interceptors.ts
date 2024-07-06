import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  SuccessResponseDTO,
  ErrorResponseDTO,
} from '../common/dto/response.dto';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, SuccessResponseDTO<T> | ErrorResponseDTO<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessResponseDTO<T> | ErrorResponseDTO<T>> {
    const httpContext = context.switchToHttp();
    const res = httpContext.getResponse();

    return next.handle().pipe(
      map((data) => {
        return new SuccessResponseDTO<T>('success', data);
      }),
      catchError((error) => {
        const statusCode =
          error instanceof HttpException
            ? error.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || 'Internal Server Error';
        const stack = error.stack;
        const errorResponse = new ErrorResponseDTO<T>('failed', {
          statusCode,
          message,
          stack,
        } as T);
        res.status(statusCode).json(errorResponse);
        return throwError(() => errorResponse);
      }),
    );
  }
}
