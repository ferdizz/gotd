import React from "react";

const api = "https://trends.google.com/trends/api/dailytrends?geo=US";

export const useTrending = () => {
  const [loading, setIsLoading] = React.useState(false);
  const [query, setQuery] = React.useState("not found");

  React.useEffect(() => {
    setIsLoading(true);
    fetch("https://gif-of-the-day.herokuapp.com/" + api)
      .then((res) => res.text())
      .then((text) => {
        console.log(text);
        let s = text.split("\n")[1];
        return JSON.parse(s);
      })
      .then((data) => {
        const q =
          data.default.trendingSearchesDays[0].trendingSearches[0].title.query;
        setQuery(q);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return { query, loading };
};
