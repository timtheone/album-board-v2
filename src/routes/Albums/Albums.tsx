import { useLoaderData } from 'react-router-dom';
import { albumsQueryLoader } from '@/api/dataFetchingHooks/useGetAlbumsQuery';
import { AlbumsTable } from '@/routes/Albums/components/AlbumsTable/AlbumsTable';
import BackButton from '@/components/BackButton/BackButton';

const Albums = () => {
  const albums = useLoaderData() as Awaited<ReturnType<ReturnType<typeof albumsQueryLoader>>>;

  return (
    <div className="container mx-auto">
      <BackButton>
        <h1 className="text-3xl font-bold">Albums</h1>
      </BackButton>
      <AlbumsTable
        columns={[
          {
            accessorKey: 'id',
            header: 'id',
          },
          {
            accessorKey: 'title',
            header: 'title',
          },
          {
            accessorKey: 'userId',
            header: 'userId',
          },
        ]}
        data={albums}
      />
    </div>
  );
};

export default Albums;
