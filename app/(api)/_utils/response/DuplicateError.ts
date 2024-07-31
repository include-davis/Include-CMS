import HttpError from './HttpError';

export default class DuplicateError extends HttpError {
  constructor(message: string) {
    super(message);
    this.name = 'DuplicateError';
    this.status = 409;
  }
}
