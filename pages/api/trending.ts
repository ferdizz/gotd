// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getTrending } from "../../lib/trending";

type Data = {
  trending?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { date } = req.query;

  const trending = await getTrending(date as string);

  if (trending) {
    res.status(200).json({ trending });
  } else {
    res.status(404).json({ error: "could not fetch trending" });
  }
}
