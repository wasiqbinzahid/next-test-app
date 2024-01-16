"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
interface IProps {
  i?: number;
}
const PageC: React.FC<IProps> = ({ i = 0 }) => {
  const [state, setState] = useState(1);
  function myFn() {
    setState(state + 1);
  }
  const router = useRouter();
  function myFn2(isD?: boolean) {
    if (isD) {
      router.push("/pageD");
      return;
    }
    router.push("/pageB");
  }
  return (
    <div>
      <div>Welcome to Page C {i}</div>
      <button onClick={myFn}> {state}</button>
      <div>Use this for programmatic navigation between components B and C and D</div>
      <button onClick={() => myFn2()}>Go to B</button>
      <button onClick={() => myFn2(true)}>Go to D</button>
      {i < 13 && <PageC i={i + 1} />}
    </div>
  );
};

export default PageC;
