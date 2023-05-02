import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import Navbar from '@/components/Navbar';

export async function getServerSideProps(context: NextPageContext) {
  try {
    const session = await getSession(context);

    if (!session) {
      return {
        redirect: {
          destination: '/auth',
          permanent: false,
        }
      };
    }

    return {
      props: {}
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {}
    };
  }
}

export default function Home() {
  return (
    <>
      <Navbar/>
    </>
  );
}
