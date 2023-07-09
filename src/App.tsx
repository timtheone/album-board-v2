import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const App = () => {
  // const { albums, isSuccess } = useGetAlbumsQuery();
  // if (isSuccess && albums) {
  //   console.log('albums', albums[2].id);
  // }
  return (
    <div className="justify-center items-center flex h-screen flex flex-col">
      <h1 className="text-3xl font-bold">Album browser</h1>
      <Button asChild className="w-24 mt-3">
        <Link to="/albums">Explore</Link>
      </Button>
    </div>
  );
};

export default App;
