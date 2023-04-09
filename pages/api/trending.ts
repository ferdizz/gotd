// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getTrending } from "../../lib/trending";

type Data = {
  trending: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const trending = await getTrending();
  res.status(200).json({ trending });
}
