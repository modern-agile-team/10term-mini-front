interface Webtoon {
  id: number;
  title: string;
  writer: string;
  illustrator: string;
  day_of_week: string;
  age_rating: string;
  description: string;
  thumbnail_url: string;
  like_count: number;
  updated_at: string;
  view_count: number;
}

const mockWebtoons: Webtoon[] = [
  {
    id: 1,
    title: "만남어플 중독",
    writer: "루즌아",
    illustrator: "루즌아",
    day_of_week: "mon",
    age_rating: "18",
    description: "20살 비인기 스트리머 초롱. 어플로 만난 정체불명의 남자와의 관계 속에서 주변 사람들의 과거, 살인, 복수가 얽히며 서서히 심연으로 빠져든다.",
    thumbnail_url: "/월.jpg",
    like_count: 98,
    updated_at: "2025-07-22T12:00:00Z",
    view_count: 12000
  },
  {
    id: 2,
    title: "괴력 남신",
    writer: "매드버드",
    illustrator: "김태형",
    day_of_week: "tue",
    age_rating: "15",
    description: "살인에서 삶의 즐거움을 느끼는 '검살귀'.",
    thumbnail_url: "/화.jpg",
    like_count: 87,
    updated_at: "2025-07-23T10:30:00Z",
    view_count: 8500
  },
  {
    id: 3,
    title: "햄자적 인생",
    writer: "UMI",
    illustrator: "슬리피-C",
    day_of_week: "wed",
    age_rating: "15",
    description: "이건 내가 아는 그 전개다",
    thumbnail_url: "/수.jpg",
    like_count: 92,
    updated_at: "2025-07-24T09:45:00Z",
    view_count: 14000
  },
  {
    id: 4,
    title: "만남어플 중독",
    writer: "루즌아",
    illustrator: "루즌아",
    day_of_week: "thu",
    age_rating: "18",
    description: "20살 비인기 스트리머 초롱. 어플로 만난 정체불명의 남자와의 관계 속에서 주변 사람들의 과거, 살인, 복수가 얽히며 서서히 심연으로 빠져든다.",
    thumbnail_url: "/목.jpg",
    like_count: 75,
    updated_at: "2025-07-21T11:15:00Z",
    view_count: 7600
  },
  {
    id: 5,
    title: "광마회귀",
    writer: "JP",
    illustrator: "이히",
    day_of_week: "fri",
    age_rating: "15",
    description: "무공에 미친 광마 이자하.",
    thumbnail_url: "/금.jpg",
    like_count: 90,
    updated_at: "2025-07-20T16:00:00Z",
    view_count: 9800
  },
  {
    id: 6,
    title: "고양이시대",
    writer: "섭이",
    illustrator: "섭이",
    day_of_week: "sat",
    age_rating: "15",
    description: "지구에 근원 모를 괴물들이 출현하고.",
    thumbnail_url: "/토.jpg",
    like_count: 83,
    updated_at: "2025-07-19T14:00:00Z",
    view_count: 8900
  },
  {
    id: 7,
    title: "육아일기",
    writer: "자까",
    illustrator: "자까",
    day_of_week: "sun",
    age_rating: "ALL",
    description: "이젠 갠플이 아니라 팀플이다!",
    thumbnail_url: "/일.jpg",
    like_count: 99,
    updated_at: "2025-07-18T18:00:00Z",
    view_count: 15000
  },
]

export { mockWebtoons };