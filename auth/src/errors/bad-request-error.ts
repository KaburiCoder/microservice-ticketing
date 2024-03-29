import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode: number = 400;

  serializeErrors() {
    return [{ message: this.message }];
  }
}
