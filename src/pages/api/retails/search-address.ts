// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type ResponseData = { error?: boolean; data?: Record<string, any>[] };

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  if (req.method !== "GET") return res.status(404).json({});

  const { q = "" } = req.query || {};

  try {
    const { data } = await axios("https://nominatim.openstreetmap.org/search", {
      params: { format: "jsonv2", "accept-language": "en", addressdetails: "1", limit: "10", q },
    });
    res.status(200).json({ data });
  } catch {
    res.status(200).json({ error: true });
  }
};

export default handler;
