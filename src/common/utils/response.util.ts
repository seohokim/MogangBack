import { CoreOutPut } from '../dto/core.dto';
import logger from '../../config/logger/logger.service';
import {
  CheckedPasswordNotMatchError,
  LectureAlreadyExistError,
  LectureNotFoundError,
  PasswordNotMatchError,
  UserAlreadyExistError,
  UserNotFoundError,
} from '../error/error.class';

export function handleErrorResponse<T extends CoreOutPut>(
  error: any,
  location: string,
): T {
  if (error instanceof UserNotFoundError) {
    return generateErrorResponse<T>(['user-not-found']);
  }
  if (error instanceof LectureNotFoundError) {
    return generateErrorResponse<T>(['lecture-not-found']);
  }
  if (error instanceof CheckedPasswordNotMatchError) {
    return generateErrorResponse<T>(['checked-password-not-match']);
  }
  if (error instanceof UserAlreadyExistError) {
    return generateErrorResponse<T>(['user-already-exist']);
  }
  if (error instanceof PasswordNotMatchError) {
    return generateErrorResponse<T>(['password-not-match']);
  }
  if (error instanceof LectureAlreadyExistError) {
    return generateErrorResponse<T>(['lecture-already-exist']);
  }

  return generateErrorResponse<T>(['server-error'], error, location);
}

export function generateErrorResponse<T extends CoreOutPut>(
  message: string[],
  error?: Error,
  location?: string,
): T {
  if (error) {
    const logObject = {
      location: location ? `[${location}]` : '[Unknown Location]',
      errorMessage: `Error: ${error.message}`,
      errorStack: error.stack,
    };
    logger.error(logObject);
  }

  return {
    ok: false,
    message,
  } as T;
}

export function generateOkResponse<T extends CoreOutPut>(
  data: Partial<T> = {}, // 추가 데이터를 위한 매개변수
): T {
  return {
    ok: true,
    ...data,
  } as T;
}
