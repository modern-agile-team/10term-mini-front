import { http, HttpResponse } from 'msw';

const dummyWebtoons = [
  {
    id: 1,
    title: "똑 닮은 딸",
    writer: "이담",
    illustrator: "이담",
    day_of_week: "mon",
    age_rating: "15",
    description: "우리 엄마가 살인마인 것 같다.",
    thumbnail_url: "/월.jpg",
    like_count: 98,
    updated_at: "2025-07-22T12:00:00Z",
    view_count: 12000
  },
  {
    id: 2,
    title: "윈터브리즈",
    writer: "한경찰",
    illustrator: "한경찰",
    day_of_week: "tue",
    age_rating: "12",
    description: "2년차 서울러 헤나의 겨울이야기.",
    thumbnail_url: "/화.jpg",
    like_count: 87,
    updated_at: "2025-07-23T10:30:00Z",
    view_count: 8500
  },
  {
    id: 3,
    title: "미연",
    writer: "서네",
    illustrator: "서네",
    day_of_week: "wed",
    age_rating: "15",
    description: "얼어붙은 기억 속 진실을 찾아 앞으로 나아갈 수 있을까?",
    thumbnail_url: "/수.jpg",
    like_count: 92,
    updated_at: "2025-07-24T09:45:00Z",
    view_count: 14000
  },
  {
    id: 4,
    title: "삼이는 재생한다",
    writer: "강은영",
    illustrator: "강은영",
    day_of_week: "thu",
    age_rating: "ALL",
    description: "삼각관계와 학교생활",
    thumbnail_url: "/목.jpg",
    like_count: 75,
    updated_at: "2025-07-21T11:15:00Z",
    view_count: 7600
  },
  {
    id: 5,
    title: "그렇게 물거품이 되어도",
    writer: "다홍",
    illustrator: "다홍",
    day_of_week: "fri",
    age_rating: "12",
    description: "미아는 괴물이 되어버린 인어들과 마주치게 되는데..",
    thumbnail_url: "/금.jpg",
    like_count: 90,
    updated_at: "2025-07-20T16:00:00Z",
    view_count: 9800
  },
  {
    id: 6,
    title: "미스 팬들턴",
    writer: "꼬막",
    illustrator: "꼬막",
    day_of_week: "sat",
    age_rating: "15",
    description: "그러나 어느 모로 보나 일등 신랑감인 그가 청혼한 상대는 바로 나인데.",
    thumbnail_url: "/토.jpg",
    like_count: 83,
    updated_at: "2025-07-19T14:00:00Z",
    view_count: 8900
  },
  {
    id: 7,
    title: "데빌샷",
    writer: "CTK",
    illustrator: "CTK",
    day_of_week: "sun",
    age_rating: "18",
    description: "죽음을 마주한 순간 지하세계의 왕과 계약했다.",
    thumbnail_url: "/일.jpg",
    like_count: 99,
    updated_at: "2025-07-18T18:00:00Z",
    view_count: 15000
  },
  {
    id: 8,
    title: "똑 닮은 딸1",
    writer: "이담",
    illustrator: "이담",
    day_of_week: "mon",
    age_rating: "15",
    description: "우리 엄마가 살인마인 것 같다.",
    thumbnail_url: "/월.jpg",
    like_count: 132,
    updated_at: "2025-07-21T10:00:00Z",
    view_count: 11111
  },
  {
    id: 9,
    title: "똑 닮은 딸2",
    writer: "이담",
    illustrator: "이담",
    day_of_week: "mon",
    age_rating: "15",
    description: "우리 엄마가 살인마인 것 같다.",
    thumbnail_url: "/월.jpg",
    like_count: 912,
    updated_at: "2025-07-23T09:30:00Z",
    view_count: 55432
  },
  {
    id: 10,
    title: "똑 닮은 딸3",
    writer: "이담",
    illustrator: "이담",
    day_of_week: "mon",
    age_rating: "15",
    description: "우리 엄마가 살인마인 것 같다.",
    thumbnail_url: "/월.jpg",
    like_count: 15,
    updated_at: "2025-07-19T12:00:00Z",
    view_count: 190000
  },
  {
    id: 11,
    title: "똑 닮은 딸4",
    writer: "이담",
    illustrator: "이담",
    day_of_week: "mon",
    age_rating: "15",
    description: "우리 엄마가 살인마인 것 같다.",
    thumbnail_url: "/월.jpg",
    like_count: 444,
    updated_at: "2025-07-22T08:20:00Z",
    view_count: 3333
  },
  {
    id: 12,
    title: "똑 닮은 딸5",
    writer: "이담",
    illustrator: "이담",
    day_of_week: "mon",
    age_rating: "15",
    description: "우리 엄마가 살인마인 것 같다.",
    thumbnail_url: "/월.jpg",
    like_count: 1984,
    updated_at: "2025-07-20T16:00:00Z",
    view_count: 8888
  },
  {
    id: 13,
    title: "똑 닮은 딸6",
    writer: "이담",
    illustrator: "이담",
    day_of_week: "mon",
    age_rating: "15",
    description: "우리 엄마가 살인마인 것 같다.",
    thumbnail_url: "/월.jpg",
    like_count: 5,
    updated_at: "2025-07-18T14:00:00Z",
    view_count: 2000000
  },
  {
    id: 14,
    title: "똑 닮은 딸7",
    writer: "이담",
    illustrator: "이담",
    day_of_week: "mon",
    age_rating: "15",
    description: "우리 엄마가 살인마인 것 같다.",
    thumbnail_url: "/월.jpg",
    like_count: 998,
    updated_at: "2025-07-17T11:00:00Z",
    view_count: 45000
  }        
]

export const handlers = [
  http.post("/api/auth/signup", async ({ request }) => {
    return HttpResponse.json(
      {
        success: true,
        data: {
          message: "회원가입 성공",
          accessToken: "fakeAccessToken.1234",
          user: {
            username: "new_user",
            nickname: "새로운유저",
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
    return HttpResponse.json(
      {
        success: true,
        data: {
          message: "로그인 성공",
          accessToken: "fakeAccessToken.1234",
          user: {
            username: "test_user",
            nickname: "현",
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

  http.post("/api/auth/logout", async () => {
    return HttpResponse.json({ success: true }, { status: 200 });
  }),

  http.get("/api/webtoons", async ({request}) => {
    const url = new URL(request.url);
    const sortKey = url.searchParams.get("sort") || "like_count";

    const sorted = [...dummyWebtoons].sort((a, b) => {
      if (sortKey === "like") return b.like_count - a.like_count;
      if (sortKey === "view") return b.view_count - a.view_count;
      if (sortKey === "updated") {
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
      return 0;
    });
    
    return await HttpResponse.json(
      sorted,
      { status: 200 },
    );
  })


]