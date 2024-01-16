"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
interface IProps {
  i?: number;
}
const PageD: React.FC<IProps> = ({ i = 0 }) => {
  const [state, setState] = useState(1);
  function myFn() {
    setState(state + 1);
  }
  const router = useRouter();
  function myFn2(isC?: boolean) {
    if (isC) {
      router.push("/pageC");
      return;
    }
    router.push("/pageB");
  }
  return (
    <div>
      <div>Welcome to Page D {i}</div>
      <button onClick={myFn}> {state}</button>
      <div>
        Use this for programmatic navigation between components B and C and D
      </div>
      <button onClick={() => myFn2()}>Go to B</button>
      <button onClick={() => myFn2(true)}>Go to C</button>
      {i < 13 && <PageD i={i + 1} />}
    </div>
  );
};

export default PageD;
