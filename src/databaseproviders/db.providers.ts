// database.providers.ts
import { MongoClient } from 'mongodb';

export const databaseProviders = [
  {
    provide: 'MONGO_CLIENT',
    useFactory: async () => {
      const client = new MongoClient(process.env.mongo_url ?? 'mongodb+srv://saurabhmanohar90:xUuGnRihAZdlpRrv@cluster0.lgkvs.mongodb.net/');
      await client.connect();
      console.log('Connected to MongoDB');
      return client;
    },
  },
];
