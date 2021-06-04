export interface ResponseModel<T> {
  data: T;
  errorMessage: String;
  message: String;
  status: String;
}
