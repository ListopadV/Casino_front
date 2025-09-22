import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const slug = Array.isArray(req.query.slug)
      ? req.query.slug.join("/")
      : req.query.slug;

    const strapiURL = `https://prized-festival-c69e982a8e.strapiapp.com/${slug}`;
    const strapiRes = await fetch(strapiURL, {
      method: req.method,
      headers: {
        "Authorization": `Bearer ${process.env.STRAPI_API_TOKEN}`, // ← токен используется только на сервере
        "Content-Type": "application/json",
      },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    const data = await strapiRes.json();
    res.status(strapiRes.status).json(data);
  } catch (error) {
    console.error("Strapi Proxy Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
