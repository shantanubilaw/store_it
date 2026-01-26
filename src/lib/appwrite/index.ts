"use server";

import * as sdk from "node-appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { cookies } from "next/headers";

export const createSessionClient = async () => {
  const client = new sdk.Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId);

  const session = (await cookies()).get("appwrite-session");

  if (!session || !session.value) throw new Error("No session");

  client.setSession(session.value);

  return {
    get account() {
      return new sdk.Account(client);
    },
    get databases() {
      return new sdk.Databases(client);
    },
  };
};

export const createAdminClient = async () => {
  const client = new sdk.Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.secretKey);

  return {
    get account() {
      return new sdk.Account(client);
    },
    get databases() {
      return new sdk.Databases(client);
    },
    get storage() {
      return new sdk.Storage(client);
    },
  };
};
