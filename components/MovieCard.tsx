import React from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import FavoriteButton from './FavoriteButton';
import { useRouter } from 'next/router';
import { BiChevronDown } from 'react-icons/bi';
import useInfoModal from '@/hooks/useInfoModal';

interface MovieCardProps {
  data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const { openModal } = useInfoModal();

  // We define a new function to handle the click on the play button
  const handlePlayClick = async () => {
    if (data.isSeries) {
      // If it's a series, we redirect to the series page
      router.push(`/series/${data?.id}`);
    } else {
      // If it's a movie, we redirect to the watch page
      router.push(`/watch/${data?.id}`);
    }
  };

  return (
    <div className="group bg-zinc-900 col-span relative h-[17vw] w-[30vw] border-2 border-blue-400">
      <img className="
        cursor-pointer
        object-cover
        transition
        duration
        shadow-xl
        rounded-md
        group-hover:opacity-90
        delay-300
        w-full
        h-full
      " src={data.thumbnailUrl} alt="Thumbnail" />
      <div className="
        opacity-0
        absolute
        top-0
        transition
        duration-200
        z-10
        invisible
        sm:visible
        delay-300
        w-full
        group-hover:opacity-100
      ">
        <div className="
          z-10
          bg-zinc-800
          p-2
          lg:p-4
          absolute
          w-full
          transition
          shadow-md
          rounded-b-md
          ">
          <div className="flex flex-row items-center gap-3">
            <div className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
              onClick={handlePlayClick} >  {/* We use the new function here */}
              <BsFillPlayFill className="text-black w-4 lg:w-6" />
            </div>
            <FavoriteButton movieId={data?.id} />
            <div onClick={() => openModal(data?.id)} className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
              <BiChevronDown className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
            </div>
          </div>
          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p>
          
          <div className="flex flex-row mt-4 gap-2 items-center"> 
            <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
          </div>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard;
