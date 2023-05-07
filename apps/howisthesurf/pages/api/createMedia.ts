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

export const Config = {
  cloud_name: "howisthesurf",
  upload_preset: "jsooiztb",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = JSON.parse(req.body);
  const mediaItem = { data };
  console.log("mediaItem", mediaItem);
  const response = await client
    .query(q.Create(q.Collection("media"), mediaItem))
    .then((response) => response)
    .catch((error) => {
      console.log("error", error);
      /* Error! return the error with statusCode 400 */
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
  //@ts-ignore
  res.status(200).json({ response });
}
