export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
  
    if (!session) {
      return {
        redirect: {
          destination: '/auth',
          permanent: false,
        }
      }
    }
  
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
  
    const watchingMovies = await prisma.movie.findMany({
      where: {
        id: {
          in: user.watchingIds,
        },
      },
    });
  
    return {
      props: {
        watchingMovies,
      },
    };
  }
  