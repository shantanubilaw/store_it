// Validate environment variables
const getEnvVar = (key: string, value: string | undefined): string => {
  if (!value) {
    console.error(`Missing environment variable: ${key}`);
    return '';
  }
  return value;
};

export const appwriteConfig = {
  endpointUrl: getEnvVar('NEXT_PUBLIC_APPWRITE_ENDPOINT', process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT),
  projectId: getEnvVar('NEXT_PUBLIC_APPWRITE_PROJECT', process.env.NEXT_PUBLIC_APPWRITE_PROJECT),
  databaseId: getEnvVar('NEXT_PUBLIC_APPWRITE_DATABASE', process.env.NEXT_PUBLIC_APPWRITE_DATABASE),
  usersCollectionId: getEnvVar('NEXT_PUBLIC_APPWRITE_USERS_COLLECTION', process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION),
  filesCollectionId: getEnvVar('NEXT_PUBLIC_APPWRITE_FILES_COLLECTION', process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION),
  bucketId: getEnvVar('NEXT_PUBLIC_APPWRITE_BUCKET', process.env.NEXT_PUBLIC_APPWRITE_BUCKET),
  secretKey: getEnvVar('NEXT_APPWRITE_KEY', process.env.NEXT_APPWRITE_KEY),
};
