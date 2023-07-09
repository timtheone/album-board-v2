import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Albums from '@/routes/Albums/Albums';
import { albumsQueryLoader } from '@/api/dataFetchingHooks/useGetAlbumsQuery';
import AlbumPhotos from '@/routes/Albums/AlbumPhotos/AlbumPhotos';
import { photosByAlbumsQueryLoader } from '@/api/dataFetchingHooks/useGetPhotosByAlbumQuery';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'albums',
    element: <Albums />,
    loader: albumsQueryLoader(queryClient),
  },
  {
    path: 'albums/:albumId',
    element: <AlbumPhotos />,
    loader: photosByAlbumsQueryLoader(queryClient),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
