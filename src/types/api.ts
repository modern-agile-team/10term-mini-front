export interface ApiResponse<T> {
  success: boolean;
  data: {
    content: T;
    message?: string;
  };
}
