import React from "react";
import { IGif } from "@giphy/js-types";
import { Gif } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { useAsync } from "react-async-hook";
import { useTrending } from "./use-trending";

const gf = new GiphyFetch("Nj6LZljJuQpa0hgKv8EgPADpxhgWawkH");

type Props = {
  size: number;
};

export const Giphy: React.FC<Props> = ({ size }) => {
  const [gif, setGif] = React.useState<IGif | null>(null);
  const { loading, query } = useTrending();

  useAsync(async () => {
    if (loading) return;
    const { data } = await gf.search(query, {
      sort: "relevant",
      limit: 1,
    });
    setGif(data[0]);
  }, [loading, query]);

  if (!gif) return <span>loading gif...</span>;

  return <Gif gif={gif} width={size} />;
};
