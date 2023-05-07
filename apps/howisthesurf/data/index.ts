import { useMutation, useQuery } from '@tanstack/react-query';
import config from './config';
import { queryClient } from '../pages/_app';

export const useAllMedia = () => {
  return useQuery({
    queryKey: ['allMedia'],
    queryFn: () =>
      fetch('/api/getAllMedia')
        .then((res) => res.json())
        .then((res) => res.allMedia),
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

      return fetch('/api/createMedia', {
        method: 'POST',
        body: JSON.stringify(media),
      }).then((res) => res.json());
    },
  });
};
