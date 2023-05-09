import axios from 'axios';
import React, { useCallback, useMemo } from 'react';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';

import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  movieId: string;
}

function hasSession(obj: any): obj is { session: Session | null; status: string } {
  return 'session' in obj;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const sessionData = useSession();
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  if (!hasSession(sessionData)) {
    return null;
  }

  const { session, status } = sessionData;
  console.log('Session in FavoriteButton:', session);

  const isFavorite = useMemo<boolean>(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete(`/api/favorite?movieId=${movieId}`);
    } else {
      response = await axios.post('/api/favorite', { movieId });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorites}
      className="
    cursor-pointer 
    group/item 
    w-6 
    h-6 
    lg:w-10 
    lg:h-10 
    border-white 
    border-2 
    rounded-full 
    flex 
    justify-center 
    items-center 
    transition 
    hover:border-neutral-300
    "
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default FavoriteButton;
