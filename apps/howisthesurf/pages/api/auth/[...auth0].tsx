import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";
import faunadb from "faunadb";

const q = faunadb.query;
const client = new faunadb.Client({
  secret: "fnADh_3JLaACAFmN7HAal6Nwe5y9CO-upQyWgSkG",
});

export const Config = {
  cloud_name: "howisthesurf",
  upload_preset: "jsooiztb",
};

const afterCallback = async (req, res, session, state) => {
  const user = session.user;
  try {
    const exists = await client.query(
      q.Exists(q.Match(q.Index("users_by_id"), user.sid))
    );
    if (!exists) {
      await client.query(q.Create(q.Collection("users"), { data: user }));
    }
  } catch (error) {
    console.log(error);
  }
  return session;
};

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      res.status(error.status || 500).end();
    }
  },
});
