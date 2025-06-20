import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { schema } from './schema.jsx'; // Adjust the import path as necessary
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
export const db = drizzle({ client: sql },{schema});