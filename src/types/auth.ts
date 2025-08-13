interface User {
  username: string;
  nickname: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginSuccessResponse {
  success: true;
  data: {
    message: string;
    content: {
      accessToken: string;
      user: User;
    };
  };
}

interface LoginFailResponse {
  success: false;
  data: {
    message: string;
  };
}

type LoginResponse = LoginSuccessResponse | LoginFailResponse;

interface SignupRequest {
  username: string;
  nickname: string;
  password: string;
}

interface SignupSuccessResponse {
  success: true;
  data: {
    message: string;
    content: {
      accessToken: string;
      refreshToken: string;
      user: User;
    };
  };
}

interface SignupFailResponse {
  status: 409;
  success: false;
  data: {
    message: string;
    field: ('username' | 'nickname')[];
  };
}

type SignupResponse = SignupSuccessResponse | SignupFailResponse;

interface LogoutSuccessResponse {
  success: true;
  data: {
    message: string;
  };
}

interface LogoutFailResponse {
  status: 500;
  success: false;
  data: {
    message: string;
  };
}

type LogoutResponse = LogoutSuccessResponse | LogoutFailResponse;

interface RefreshTokenSuccessResponse {
  success: true;
  data: {
    message: string;
    content: string;
  };
}

interface RefreshTokenFailResponse {
  status: 400 | 401;
  success: false;
  data: {
    message: string;
  };
}

type RefreshTokenResponse = RefreshTokenSuccessResponse | RefreshTokenFailResponse;

export type {
  User,
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  LogoutResponse,
  RefreshTokenResponse,
};
