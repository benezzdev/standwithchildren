"use server";

import { cookies } from "next/headers";

export const logoutCookie = () => {
  cookies().delete("token");
};
