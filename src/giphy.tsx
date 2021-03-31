import React from "react";
import { IGif } from "@giphy/js-types";
import { Gif } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { useAsync } from "react-async-hook";

const gf = new GiphyFetch("Nj6LZljJuQpa0hgKv8EgPADpxhgWawkH");
const trendingWord = "TRENDING";

type Props = {
  size: number;
};

export const Giphy: React.FC<Props> = ({ size }) => {
  const [gif, setGif] = React.useState<IGif | null>(null);

  useAsync(async () => {
    const { data } = await gf.search(trendingWord, {
      sort: "relevant",
      limit: 1,
    });
    setGif(data[0]);
  }, []);

  if (!gif) return <span>loading gif...</span>;

  return <Gif gif={gif} width={size} />;
};
