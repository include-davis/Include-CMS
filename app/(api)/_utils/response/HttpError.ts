export default class HttpError extends Error {
  public status: number;

  constructor(message: string = 'Internal Server Error') {
    super(message);
    this.status = 400;
  }
}
