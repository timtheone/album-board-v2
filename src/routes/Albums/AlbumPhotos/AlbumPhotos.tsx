import { useLoaderData } from 'react-router-dom';
import { photosByAlbumsQueryLoader } from '@/api/dataFetchingHooks/useGetPhotosByAlbumQuery';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Suspense } from 'react';
import BackButton from '@/components/BackButton/BackButton';

const AlbumPhotos = () => {
  const photosByAlbum = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof photosByAlbumsQueryLoader>>
  >;

  return (
    <div className="container">
      <BackButton>
        <h1 className="text-3xl font-bold">Photos</h1>
      </BackButton>
      <div className="flex flex-wrap gap-3 w-full flex justify-center">
        <Suspense fallback={'Loading...'}>
          {photosByAlbum.map((photo) => (
            <Card key={photo.id} className="w-full sm:w-1/3 lg:w-1/6 shadow-lg">
              <CardContent>
                <img src={photo.thumbnailUrl} alt={photo.title} />
              </CardContent>
              <CardFooter>
                <p>{photo.title}</p>
              </CardFooter>
            </Card>
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default AlbumPhotos;
