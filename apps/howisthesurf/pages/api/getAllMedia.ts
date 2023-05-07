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
  const allMedia = await client
    .query(q.Paginate(q.Match(q.Ref("indexes/all_media"))))
    .then(async (response: any) => {
      const mediaRefs = response.data;
      console.log("Media refs", mediaRefs);
      console.log(`${mediaRefs.length} pieces of media found`);

      const getAllMediaDataQuery = mediaRefs.map((ref: any) => {
        return q.Get(ref);
      });
      // then query the refs
      const allMediaData = await client.query(getAllMediaDataQuery);
      return allMediaData;
    })
    .catch((error) => {
      console.log("error", error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
  // const {
  //   id,
  //   user_metadata: { full_name },
  // } = netlifyIdentity.currentUser();

  //@ts-ignore
  res.status(200).json({ allMedia });
}
