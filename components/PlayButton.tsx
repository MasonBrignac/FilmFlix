import React from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { useRouter } from 'next/router';

interface PlayButtonProps {
  movieId: string;
  onPlay?: () => void; // Add this line
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId, onPlay }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onPlay) {
      onPlay();
    }

    router.push(`/watch/${movieId}`);
  };

  return (
    <button 
      onClick={handleClick}
      className="
        bg-white 
        rounded-md 
        py-1 md:py-2 
        px-2 md:px-4
        w-auto 
        text-xs lg:text-lg 
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-neutral-300
        transition
        "
      >
        <BsFillPlayFill size={20} />
        Play
    </button>
  );
}

export default PlayButton;
