"use server";

import { createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { parseStringify } from "@/lib/utils";

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);
    console.log("OTP sent to:", email);
    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send email OTP");
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

    return parseStringify({ accountId });
  } catch (error) {
    console.error("Error in createAccount:", error);
    handleError(error, "Failed to create account");
  }
};

export const signInUser = async ({ email }: { email: string }) => {
  try {
    console.log("Signing in user:", email);
    
    const accountId = await sendEmailOTP({ email });
    console.log("Account ID from OTP:", accountId);
    
    if (!accountId) throw new Error("Failed to send an OTP");

    return parseStringify({ accountId });
  } catch (error) {
    console.error("Error in signInUser:", error);
    handleError(error, "Failed to sign in user");
  }
};

export const verifySecret = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) => {
  console.log("Verifying OTP for accountId:", accountId, "with password:", password);
  console.log("OTP verification successful! (Demo mode - not actually verifying)");
  return parseStringify({ sessionId: "demo-session-id" });
};

export const getCurrentUser = async () => {
  // Demo mode - return a mock user
  return parseStringify({
    $id: "demo-user-id",
    accountId: "demo-account-id",
    email: "demo@example.com",
    fullName: "Demo User",
    avatar: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg",
  });
};

export const signOutUser = async () => {
  console.log("User signed out (Demo mode)");
  // In demo mode, just log - don't actually sign out
};
