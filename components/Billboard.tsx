import React, { useCallback } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import useBillboard from '@/hooks/useBillboard';
import PlayButton from './PlayButton';
import useInfoModal from '@/hooks/useInfoModal';
import { useRouter } from 'next/router';


const Billboard: React.FC = () => {
  const { data } = useBillboard();
  const { openModal } = useInfoModal();
  const router = useRouter();
  const [muted, setMuted] = React.useState(true);

  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data?.id]);

  const handlePlay = useCallback(() => {
    if (data.isSeries) {
      router.push(`/series/${data?.id}`);
    } else {
      router.push(`/watch/${data?.id}`);
    }
  }, [router, data?.id, data?.isSeries]);

  return (
    <div className="relative h-[56.25vw] min-h-[300px] max-h-[750px]">
      <video
        poster={data?.thumbnailUrl}
        className="
        w-full 
        h-full 
        object-cover 
        brightness-[60%] 
        transition duration-500
        "
        autoPlay
        muted={muted}
        loop
        src={data?.videoUrl}
      ></video>

      <div className="absolute bottom-5 left-2">
        <button
          onClick={() => setMuted(!muted)}
          className="bg-white bg-opacity-50 rounded-md py-2 px-5 text-xs font-semibold hover:bg-opacity-30 transition"
        >
          {muted ? 'Unmute' : 'Mute'}
        </button>
      </div>

      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={data?.id} onPlay={handlePlay} />
          <button
          onClick={handleOpenModal}
            className="
            bg-white
            text-white
            bg-opacity-30 
            rounded-md 
            py-1 md:py-2 
            px-2 md:px-4
            w-auto 
            text-xs lg:text-lg 
            font-semibold
            flex
            flex-row
            items-center
            hover:bg-opacity-20
            transition
            "
          >
            <AiOutlineInfoCircle className="w-4 md:w-7 mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
