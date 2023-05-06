const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  console.log('Session:', session);

  if (!session?.user?.email) {
    console.log('Not signed in');
    throw new Error('Not signed in');
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    }
  });

  console.log('Current user:', currentUser);
  
  if (!currentUser) {
    console.log('Not signed in');
    throw new Error('Not signed in');
  }

  return { currentUser };
}
