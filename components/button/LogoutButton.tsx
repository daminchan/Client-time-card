"use client";

import { signOut } from "next-auth/react";

import CustomButton from "./CustomButton";

export default function LogoutButton() {
  return (
    <CustomButton width="150px" onClick={() => signOut({ callbackUrl: "/" })}>
      ログアウト
    </CustomButton>
  );
}
