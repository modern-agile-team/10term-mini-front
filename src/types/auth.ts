interface User {
  username: string;
  nickname: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginSuccessResponse {
  status: 200;
  success: true;
  data: {
    message: string;
    accessToken: string;
    refreshToken: string;
    user: User;
  };
}

interface LoginFailResponse {
  status: 401;
  success: false;
  data: {
    message: string;
  }
}

type LoginResponse = LoginSuccessResponse | LoginFailResponse;

interface SignupRequest {
  username: string;
  nickname: string;
  password: string;
}

interface SignupSuccessResponse {
  status: 201;
  success: true;
  data: {
    field: null;
    message: string;
    accessToken: string;
    refreshToken: string;
    user: User;
  };
}

interface SignupFailResponse {
  status: 409;
  success: false;
  data: {
    field: ("username" | "nickname")[];
  };
}

type SignupResponse = SignupSuccessResponse | SignupFailResponse;

export type { User, LoginRequest, LoginResponse, SignupRequest, SignupResponse };
