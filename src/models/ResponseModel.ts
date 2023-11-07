export default interface ResponseModel<T, U> {
  code: number;
  isSuccess: boolean;
  message: string;
  data: T;
  additionalData: U;
}
