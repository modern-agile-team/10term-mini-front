import { http, HttpResponse } from "msw";
import { mockWebtoons } from "../models/webtoon";

const webtoonHandlers = [
  http.get("/api/webtoons", async ({request}) => {
    const url = new URL(request.url);
    const sortKey = url.searchParams.get("sort") || "like_count";

    const sorted = [...mockWebtoons].sort((a, b) => {
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

export default webtoonHandlers;