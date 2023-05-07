// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
// import netlifyIdentity from "netlify-identity-widget";

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
  const url = `https://api.cloudinary.com/v1_1/${Config.cloud_name}/upload`;
  const formData = req.body;

  try {
    const data: any = await axios.post(url, formData);

    const media = {
      public_id: data.public_id,
      tags: data.tags,
      resource_type: data.resource_type,
      created_at: data.created_at,
      url: data.url,
      width: data.width,
      height: data.height,
    };
    console.log(media);
  } catch (error) {
    console.log(error);
  }

  // const {
  //   id,
  //   user_metadata: { full_name },
  // } = netlifyIdentity.currentUser();

  res.status(200).json({ name: "John Doe" });
}
