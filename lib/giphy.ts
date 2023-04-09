import { GiphyFetch } from "@giphy/js-fetch-api";

const gf = new GiphyFetch(process.env.GIPHY || "");

export const getGiphyData = async (query: string) => {
  const { data } = await gf.search(query, {
    sort: "relevant",
    limit: 1
  });

  return data[0];
};
