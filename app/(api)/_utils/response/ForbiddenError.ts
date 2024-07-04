import HttpError from './HttpError';

export default class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
    this.status = 403;
  }
}
