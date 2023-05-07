// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import faunadb from "faunadb";

const q = faunadb.query;
const client = new faunadb.Client({
  secret: "fnADh_3JLaACAFmN7HAal6Nwe5y9CO-upQyWgSkG",
});

type Data = {
  name: string;
};

function getId(urlPath: string) {
  return urlPath.match(/([^\/]*)\/*$/)?.[0];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const id = getId(req.body);
  try {
    //@ts-ignore
    const user = await client.query(q.Get(q.Match(q.Index("users_by_id"), id)));
    //@ts-ignore
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
}
