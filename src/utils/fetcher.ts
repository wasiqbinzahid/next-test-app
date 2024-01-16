"use server";
import { cache } from "react";
import { cookies } from "next/headers";
import { API, Amplify } from "aws-amplify";
Amplify.configure({
  API: {
    endpoints: [
      {
        name: "MyEndpoint",
        endpoint: "https://jsonplaceholder.typicode.com",
      },
    ],
  },
});
export interface ResponseData {
  name: string;
  id: string;
}

export const getStuff = cache(async (id: string | number) => {
  return await fetchServer<ResponseData[]>("/users");
});

export async function setCookie(str: string) {
  const CookieStore = cookies();
  CookieStore.set("token", str);
}

export async function fetchServer<T>(path: string) {
  const CookieStore = cookies();
  const tokenData = CookieStore.get("token");
  const token = tokenData?.value || "";

  const dataStuff = await API.get("MyEndpoint", path, {}).then((response) => {
    if (!token) return [];
    // Add your code here
    return response as T;
  });

  return {
    data: dataStuff,
    token,
  };
}
