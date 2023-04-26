import type { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcrypt';
import prismadb from '@/libs/prismadb';

// This is the main handler function for the API route.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the request method is POST; if not, return a 405 status (Method Not Allowed).
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  // Extract email, name, and password from the request body.
  const { email, name, password } = req.body;

  // Check if email, name, and password are provided; if not, return a 400 status (Bad Request).
  if (!email || !name || !password) {
    return res.status(400).json({ error: 'Email, name, and password are required.' });
  }

  // Check if a user with the provided email already exists in the database.
  const existingUser = await prismadb.user.findUnique({ where: { email } });

  // If a user with the provided email already exists, return a 409 status (Conflict).
  if (existingUser) {
    return res.status(409).json({ error: 'Email is already in use.' });
  }

  // Hash the password using bcrypt with a salt round of 10.
  const hashedPassword = await hash(password, 10);

  // Try creating a new user with the provided data.
  try {
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    // Log the created user.
    console.log('User Created:', user);
    // Return the created user with a 200 status (OK).
    return res.status(200).json(user);
  } catch (error) {
    // Log the error.
    console.error('Error:', error);
    console.log('Error Message:', error.message);
    console.log('Error Stack:', error.stack);
    // Return a 500 status (Internal Server Error) if there's an error during user creation.
    return res.status(500).json({ error: 'An internal server error occurred.' });
  }
}

