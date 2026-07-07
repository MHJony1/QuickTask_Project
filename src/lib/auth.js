import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { jwt } from 'better-auth/plugins';

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      strategy: 'jwt',
      maxAge: 30 * 24 * 60 * 60,
    },
  },
  user: {
    additionalFields: {
      isPremium: {
        type: 'boolean',
        defaultValue: false,
        input: false, 
      },
    },
  },
  plugins: [
    jwt({
      jwt: {
        definePayload: ({ user }) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          isPremium: user.isPremium,
        }),
      },
    }),
  ],
  database: mongodbAdapter(db),
});
