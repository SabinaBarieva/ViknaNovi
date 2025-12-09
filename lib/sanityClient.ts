import { createClient } from 'next-sanity';

export const sanityClient = createClient({
  projectId: '4ay8yu0o', 
  dataset: 'production',
  apiVersion: '2021-10-21',
  useCdn: true,
});
