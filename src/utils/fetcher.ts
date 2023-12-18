"use server";
import { cache } from "react";
import { API } from "aws-amplify";
import { cookies } from "next/headers";

export interface ResponseData {
  name: string;
  id: string;
}

export const getStuff = cache(async (id: string | number) => {
  return await fetchServer<ResponseData[]>(
    "get",
    `https://jsonplaceholder.typicode.com/users/`
  );
});

export async function setCookie(str: string) {
  const CookieStore = cookies();
  CookieStore.set("token", str);
}

export async function fetchServer<T>(
  method: "get" | "post" | "del" | "patch" | "put",
  path: string,
  data?: BodyInit
) {
  const CookieStore = cookies();
  const tokenData = CookieStore.get("token");
  const token = tokenData?.value || "";
  const dataStuff: T = await fetch(path, {
    method,
    body: data,
  }).then((res) => res.json());

  return {
    data: dataStuff,
    token,
  };
}
