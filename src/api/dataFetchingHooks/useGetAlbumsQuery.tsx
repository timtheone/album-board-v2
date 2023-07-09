import { QueryClient, useQuery } from '@tanstack/react-query';

type Album = {
  userId: number;
  id: number;
  title: string;
};
function getAlbums(start = 0, limit = 10, userId?: number): Promise<Album[]> {
  let queryString = `?_start=${start}&_limit=${limit}`;
  if (userId) {
    queryString += `&userId=${userId}`;
  }

  return fetch(`https://jsonplaceholder.typicode.com/albums${queryString}`)
    .then((res) => res.json())
    .then((data: Album[]) => data);
}

export const getAlbumsQuery = (page: number, userId?: number) => ({
  queryKey: ['albums', page, userId],
  queryFn: () => getAlbums(page * 10, 10, userId),
  keepPreviousData: true,
});

export const albumsQueryLoader =
  (queryClient: QueryClient) =>
  async ({ request }: { request: Request }): Promise<Album[]> => {
    const URLObject = new URL(request.url);
    const page = Number(URLObject.searchParams.get('page'));
    const userId = Number(URLObject.searchParams.get('userId'));
    const query = userId ? getAlbumsQuery(page ?? 0, userId) : getAlbumsQuery(page ?? 0);
    return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
  };
export function useGetAlbumsQuery() {
  const query = getAlbumsQuery(0);
  const { data, isSuccess } = useQuery(query);

  return { albums: data, isSuccess };
}
