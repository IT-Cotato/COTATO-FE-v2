/**
 * 200 응답
 */
export interface SuccessResponse<T> {
  code: string;
  message: string;
  data: T;
}
