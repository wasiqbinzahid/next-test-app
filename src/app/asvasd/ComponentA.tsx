import { getStuff } from "@/utils/fetcher";
import { NextComponentType } from "next";
import React from "react";
import MyComponent from "./defa/MyComponent";
import { cookies } from "next/headers";

const Component = async ({ children }: React.PropsWithChildren) => {
  const { data, token: tokenUsed } = await getStuff(2);
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return (
    <div>
      <br />
      <br />
      <div>
        Token used on last fetch:
        <div>{tokenUsed}</div>
      </div>
      <br />
      <br />
      <h2>Parent Starts Here</h2>
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
      <br />
      <br />

      <h2>Here starts the client side component</h2>
      <MyComponent token={token?.value || ""} data={data} />
    </div>
  );
};

export default Component;
