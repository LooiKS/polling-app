export class IResponse<T> {
  data: T;
  status: string
  message: string;
  errorMessage: string;
}
