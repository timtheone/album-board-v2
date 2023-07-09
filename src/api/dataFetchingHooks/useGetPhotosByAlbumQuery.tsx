import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';

type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};
function getPhotosByAlbums(albumdId: number): Promise<Photo[]> {
  return fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumdId}`)
    .then((res) => res.json())
    .then((data: Photo[]) => data);
}

export const getPhotoByAlbumsQuery = (albumId: number) => ({
  queryKey: ['photos', albumId],
  queryFn: () => getPhotosByAlbums(albumId),
  keepPreviousData: true,
});

export const photosByAlbumsQueryLoader =
  (queryClient: QueryClient) =>
  async (loaderArgs: LoaderFunctionArgs): Promise<Photo[]> => {
    const query = getPhotoByAlbumsQuery(Number(loaderArgs.params.albumId));
    return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
  };
