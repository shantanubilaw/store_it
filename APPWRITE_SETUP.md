# Appwrite Setup Guide

This guide will help you set up Appwrite for your Store It application.

## Option 1: Appwrite Cloud (Recommended for beginners)

1. **Sign Up**
   - Go to [cloud.appwrite.io](https://cloud.appwrite.io)
   - Create a free account

2. **Create a Project**
   - Click "Create Project"
   - Give it a name (e.g., "Store It")
   - Copy the Project ID

3. **Configure Environment Variables**
   - Open `.env.local` in your project
   - Set:
     ```env
     NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
     NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
     ```

4. **Add Platform (Web App)**
   - In your Appwrite project, go to "Settings" > "Platforms"
   - Click "Add Platform" > "Web App"
   - Name: Store It
   - Hostname: `localhost` (for development)
   - Add `*.vercel.app` if deploying to Vercel

## Option 2: Self-Hosted Appwrite

1. **Install Docker**
   - Make sure Docker is installed on your system

2. **Run Appwrite**
   ```bash
   docker run -it --rm \
     --volume /var/run/docker.sock:/var/run/docker.sock \
     --volume "$(pwd)"/appwrite:/usr/src/code/appwrite:rw \
     --entrypoint="install" \
     appwrite/appwrite:latest
   ```

3. **Access Appwrite**
   - Open http://localhost (or your server IP)
   - Create an account and project

4. **Configure Environment Variables**
   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=http://localhost/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
   ```

## Setting Up Authentication

1. **Enable Auth Methods**
   - Go to "Auth" in your Appwrite console
   - Enable desired auth methods:
     - Email/Password
     - Magic URL
     - OAuth2 (Google, GitHub, etc.)

2. **Example Usage in Your App**
   ```typescript
   import { account } from '@/lib/appwrite';

   // Register a new user
   const user = await account.create(
     'unique()',
     'user@example.com',
     'password',
     'John Doe'
   );

   // Login
   const session = await account.createEmailPasswordSession(
     'user@example.com',
     'password'
   );

   // Get current user
   const currentUser = await account.get();

   // Logout
   await account.deleteSession('current');
   ```

## Setting Up Database

1. **Create a Database**
   - Go to "Databases" in your Appwrite console
   - Click "Create Database"
   - Name it (e.g., "main")
   - Copy the Database ID

2. **Create a Collection**
   - Click "Create Collection"
   - Name it (e.g., "items")
   - Copy the Collection ID

3. **Add Attributes**
   - Add fields to your collection:
     - String: `name`, `description`
     - Integer: `quantity`, `price`
     - DateTime: `createdAt`

4. **Set Permissions**
   - Go to "Settings" tab of your collection
   - Configure permissions:
     - Create: Users
     - Read: Users
     - Update: Users
     - Delete: Users

5. **Example Usage**
   ```typescript
   import { databases } from '@/lib/appwrite';

   const DATABASE_ID = 'your_database_id';
   const COLLECTION_ID = 'your_collection_id';

   // Create a document
   const doc = await databases.createDocument(
     DATABASE_ID,
     COLLECTION_ID,
     'unique()',
     {
       name: 'Product Name',
       description: 'Product description',
       quantity: 10,
       price: 99.99
     }
   );

   // List documents
   const documents = await databases.listDocuments(
     DATABASE_ID,
     COLLECTION_ID
   );

   // Get a document
   const document = await databases.getDocument(
     DATABASE_ID,
     COLLECTION_ID,
     'document_id'
   );

   // Update a document
   await databases.updateDocument(
     DATABASE_ID,
     COLLECTION_ID,
     'document_id',
     { quantity: 5 }
   );

   // Delete a document
   await databases.deleteDocument(
     DATABASE_ID,
     COLLECTION_ID,
     'document_id'
   );
   ```

## Setting Up Storage

1. **Create a Bucket**
   - Go to "Storage" in your Appwrite console
   - Click "Create Bucket"
   - Name it (e.g., "images")
   - Copy the Bucket ID

2. **Configure Settings**
   - Maximum file size
   - Allowed file extensions
   - Enable compression (optional)

3. **Set Permissions**
   - Configure who can create, read, update, delete files

4. **Example Usage**
   ```typescript
   import { storage } from '@/lib/appwrite';

   const BUCKET_ID = 'your_bucket_id';

   // Upload a file
   const file = await storage.createFile(
     BUCKET_ID,
     'unique()',
     document.getElementById('file-input').files[0]
   );

   // Get file preview/download URL
   const url = storage.getFilePreview(BUCKET_ID, file.$id);

   // Delete a file
   await storage.deleteFile(BUCKET_ID, file.$id);
   ```

## Environment Variables Reference

Create or update `.env.local` with these variables:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here

# Optional: Add these if you're using specific services
# NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
# NEXT_PUBLIC_APPWRITE_COLLECTION_ID=your_collection_id
# NEXT_PUBLIC_APPWRITE_BUCKET_ID=your_bucket_id
```

## Security Best Practices

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Use server-side API keys** for sensitive operations
3. **Configure proper permissions** for collections and buckets
4. **Enable rate limiting** in production
5. **Use HTTPS** in production

## Useful Resources

- [Appwrite Documentation](https://appwrite.io/docs)
- [Web SDK Reference](https://appwrite.io/docs/references/cloud/client-web/account)
- [Community Discord](https://appwrite.io/discord)

## Troubleshooting

### CORS Errors
- Make sure you've added your domain to the platform settings in Appwrite console

### Connection Refused
- Check if your Appwrite endpoint URL is correct
- Verify firewall settings for self-hosted instances

### Unauthorized Errors
- Verify your Project ID is correct
- Check collection/bucket permissions
- Ensure user is authenticated for protected resources
