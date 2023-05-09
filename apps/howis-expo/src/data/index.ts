import { useMutation, useQuery } from '@tanstack/react-query';
import config from './config';
import faunadb from 'faunadb';
import { QueryClient } from '@tanstack/react-query';
export const queryClient = new QueryClient();

const q = faunadb.query;
const client = new faunadb.Client({
  secret: 'fnADh_3JLaACAFmN7HAal6Nwe5y9CO-upQyWgSkG',
});
const getAllMedia = async () => {
  const allMedia = await client
    .query(q.Paginate(q.Match(q.Ref('indexes/all_media'))))
    .then(async (response: any) => {
      const mediaRefs = response.data;
      console.log('Media refs', mediaRefs);
      console.log(`${mediaRefs.length} pieces of media found`);

      const getAllMediaDataQuery = mediaRefs.map((ref: any) => {
        return q.Get(ref);
      });
      // then query the refs
      const allMediaData = await client.query(getAllMediaDataQuery);
      return allMediaData;
    })
    .catch((error) => {
      console.log('error', error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });

  return allMedia;
};

export const useAllMedia = () => {
  return useQuery({
    queryKey: ['allMedia'],
    queryFn: () => getAllMedia(),
  });
};

export const useCreateMedia = () => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allMedia'] });
    },
    mutationFn: async ({
      file,
      tags,
      user,
    }: {
      file: any;
      tags: any;
      user: any;
    }) => {
      const url = `https://api.cloudinary.com/v1_1/${config.cloud_name}/upload`;

      const data = new FormData();

      data.append('upload_preset', config.upload_preset);
      data.append('file', file);
      data.append('tags', tags);
      data.append('context', `photo=${file.name}`);

      const cloudinaryData = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      }).then((res) => res.json());

      const media = {
        public_id: cloudinaryData.public_id,
        tags: cloudinaryData.tags,
        resource_type: cloudinaryData.resource_type,
        created_at: cloudinaryData.created_at,
        url: cloudinaryData.url,
        width: cloudinaryData.width,
        height: cloudinaryData.height,
        user: {
          name: user.name,
          picture: user.picture,
        },
      };

      await client.query(q.Create(q.Collection('media'), { data: media }));
      return;
    },
  });
};
