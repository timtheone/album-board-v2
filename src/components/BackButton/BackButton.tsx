import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';

const BackButton = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-2 my-5">
      <Button size="icon" onClick={() => navigate(-1)}>
        <ArrowLeft />
      </Button>
      {children}
    </div>
  );
};

export default BackButton;
