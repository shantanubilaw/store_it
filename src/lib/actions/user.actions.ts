"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { ID } from "appwrite";
import { parseStringify } from "@/lib/utils";
import { cookies } from "next/headers";
import { appwriteConfig } from "@/lib/appwrite/config";
import { cache } from "react";

const handleError = (error: unknown, message: string) => {
  console.error(message, error);
  // Don't throw - let calling functions handle errors by returning null
};

export const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email, false);
    console.log("OTP sent to:", email);
    return session.userId;   // Return the user's account ID 
  } catch (error) {
    handleError(error, "Failed to send email OTP");
    return null;
  }
};

export const createAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  try {
    console.log("Creating account for:", email, fullName);

    const accountId = await sendEmailOTP({ email });
    console.log("Account ID from OTP:", accountId);

    if (!accountId) throw new Error("Failed to send an OTP");

    // Try to store user data in database (optional, won't block auth if fails)
    try {
      const { databases } = await createAdminClient();
      
      // Check if user already exists
      try {
        await databases.getDocument(
          appwriteConfig.databaseId,
          appwriteConfig.usersCollectionId,
          accountId
        );
        console.log("User document already exists");
      } catch (getError: any) {
        // User doesn't exist, create new document
        if (getError.code === 404) {
          await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            accountId,
            {
              // Match Appwrite collection attribute names (case sensitive)
              accountId: accountId,
              FullName: fullName,
              email: email,
              avatar: "",
            }
          );
          console.log("User document created in database");
        } else {
          throw getError;
        }
      }
    } catch (dbError) {
      console.warn("Warning: Could not create user document in database:", dbError);
      // Don't fail the entire sign up process if database write fails
    }

    return parseStringify({ accountId });
  } catch (error) {
    console.error("Error in createAccount:", error);
    handleError(error, "Failed to create account");
    return null;
  }
};

export const signInUser = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    console.log("Signing in user:", email);

    const accountId = await sendEmailOTP({ email });
    console.log("Account ID from OTP:", accountId);

    if (!accountId) throw new Error("Failed to send an OTP");

    return parseStringify({ accountId });
  } catch (error) {
    console.error("Error in signInUser:", error);
    handleError(error, "Failed to sign in user");
    return null;
  }
};

export const verifySecret = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) => {
  const { account } = await createAdminClient();

  try {
    console.log("Verifying OTP for accountId:", accountId);

    // Create session with OTP token
    const session = await account.createSession(accountId, password);

    if (!session) throw new Error("Failed to create session");

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    console.log("OTP verification successful!");
    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    handleError(error, "Failed to verify OTP");
    return null;
  }
};

// Cache getCurrentUser to prevent duplicate API calls during the same request
export const getCurrentUser = cache(async () => {
  try {
    const { account, databases } = await createSessionClient();

    const accountDetails = await account.get();
    
    // Try to get user document from database
    try {
      const userDoc = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        accountDetails.$id
      );
      return parseStringify(userDoc);
    } catch (dbError) {
      console.warn("Warning: Could not fetch user from database:", dbError);
      // Return minimal user data from account if database fetch fails
      return parseStringify({
        $id: accountDetails.$id,
        accountId: accountDetails.$id,
        email: accountDetails.email,
        fullName: accountDetails.name || "",
        avatar: "",
      });
    }
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
});

export const signOutUser = async () => {
  const { account } = await createSessionClient();

  try {
    await account.deleteSession("current");

    // Clear session cookie
    const cookieStore = await cookies();
    cookieStore.delete("appwrite-session");

    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
    handleError(error, "Failed to sign out");
    return null;
  }
};
