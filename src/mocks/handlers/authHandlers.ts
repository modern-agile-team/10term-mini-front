import { http, HttpResponse } from "msw";
import type { LoginRequest, SignupRequest } from "../../types/auth";

const authHandlers = [
  http.post("/api/auth/signup", async ({ request }) => {
    const body = (await request.json()) as SignupRequest;
    const { username, nickname } = body;

    if (username === "existinguser") {
      return HttpResponse.json(
        {
          success: false,
          data: {
            field: ["username"]
          },
        },
        {
          status: 409,
        }
      )
    }

    return HttpResponse.json(
      {
        status: 201,
        success: true,
        data: {
          field: null,
          message: "회원가입 성공",
          accessToken: "fakeAccessToken.1234",
          refreshToken: "fakeRefreshToken.5678",
          user: {
            username: username,
            nickname: nickname,
          },
        },
      },
      {
        status: 201,
        headers: {
          "Set-Cookie": `refreshToken=fakeRefreshToken.5678; HttpOnly; Secure; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}`,
        },
      }
    );
  }),

  http.post("/api/auth/login", async ({ request }) => {
    const body = (await request.json()) as LoginRequest;
    const { username, password } = body;

    if (username === "asdf1234") {
      if (password !== "asdf1234") {
        return HttpResponse.json(
          {
            status: 401,
            success: false,
            data: {
              message: "비밀번호 불일치",
            }
          },
          {
            status: 401,
          }
        )
      }
    }

    return HttpResponse.json(
      {
        status: 200,
        success: true,
        data: {
          message: "로그인 성공",
          accessToken: "fakeAccessToken.1234",
          refreshToken: "fakeRefreshToken.0917",
          user: {
            username: username,
            nickname: "임시유저",
          },
        },
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `refreshToken=fakeRefreshToken.5678; HttpOnly; Secure; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}`,
        },
      }
    );
  }),

  http.post("/api/auth/token", async () => {
    return HttpResponse.json(
      {
        status: 200,
        success: true,
        data: {
          accessToken: "newAccessToken.5678",
        },
      },
      {
        status: 200,
      }
    );
  }),

  http.post("/api/auth/logout", () => {
    return HttpResponse.json(
      {
        status: 200,
        success: true,
        data: {
          message: "로그아웃 되었습니다.",
        },
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": "refreshToken=; Max-Age=0; HttpOnly; Secure; SameSite=Strict",
        },
      }
    );
  }),
]

export default authHandlers;