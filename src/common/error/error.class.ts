export class UserNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserNotFoundError';
  }
}
export class UserAlreadyExistError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserAlreadyExistError';
  }
}

export class CheckedPasswordNotMatchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CheckedPasswordNotMatchError';
  }
}

export class PasswordNotMatchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PasswordNotMatchError';
  }
}

export class LectureNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LectureNotFoundError';
  }
}
export class LectureAlreadyExistError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LectureAlreadyExistError';
  }
}
