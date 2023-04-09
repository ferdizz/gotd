import { fetchAndCache } from "./redisCache";

const fetchTrending = async () => {
  let query = "";

  const res = await fetch(
    "https://trends.google.com/trends/api/dailytrends?geo=US"
  );

  if (res.ok) {
    const textResponse = await res.text();
    const jsonData = JSON.parse(textResponse.split("\n")[1]);
    query =
      jsonData.default.trendingSearchesDays[0].trendingSearches[0].title.query;
    console.log("Success! ", query);
  } else {
    console.log("Response failed: ", res.statusText);
  }

  return { query };
};

export const getTrending = async () => {
  const { query } = await fetchAndCache(
    new Date().toLocaleDateString(),
    fetchTrending,
    60 * 60 * 24 * 365
  );

  return query;
};
