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

export type { User, LoginRequest, LoginResponse };
