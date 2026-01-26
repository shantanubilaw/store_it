/* eslint-disable no-unused-vars */

import type { Models } from "node-appwrite";

declare global {
  type FileType = "document" | "image" | "video" | "audio" | "other";

  interface ActionType {
    label: string;
    icon: string;
    value: string;
  }

  interface SearchParamProps {
    params?: Promise<SegmentParams>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
  }

  interface UploadFileProps {
    file: File;
    ownerId: string;
    accountId: string;
    path: string;
  }
  interface GetFilesProps {
    types: FileType[];
    searchText?: string;
    sort?: string;
    limit?: number;
  }
  interface RenameFileProps {
    fileId: string;
    name: string;
    extension: string;
    path: string;
  }
  interface UpdateFileUsersProps {
    fileId: string;
    emails: string[];
    path: string;
  }
  interface DeleteFileProps {
    fileId: string;
    bucketFileId: string;
    path: string;
  }

  interface FileUploaderProps {
    ownerId: string;
    accountId: string;
    className?: string;
  }

  interface MobileNavigationProps {
    ownerId: string;
    accountId: string;
    fullName: string;
    avatar: string;
    email: string;
  }
  interface SidebarProps {
    fullName: string;
    avatar: string;
    email: string;
  }

  interface ThumbnailProps {
    type: string;
    extension: string;
    url: string;
    className?: string;
    imageClassName?: string;
  }

  interface ShareInputProps {
    file: Models.Document;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: (email: string) => void;
  }
}

// Extend Appwrite Models.Document with custom file properties

declare module "node-appwrite" {
  namespace Models {
    interface Document {
      bucketfield?: string;
      name?: string;
      type?: string;
      extension?: string;
      url?: string;
      size?: string;
      owner?: {
        $id: string;
        fullName: string;
        email: string;
        avatar: string;
      };
      users?: string[];
      email?: string;
      fullName?: string;
      avatar?: string;
      accountId?: string;
    }
  }
}

export {};
