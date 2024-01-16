"use client";
import React, { useState } from "react";
import { setCookie } from "@/utils/fetcher";
import { Amplify, Auth } from "aws-amplify";

export function configureAws() {
  Amplify.configure({
    Auth: {
      region: "us-east-2",
      userPoolId: "us-east-2_YVo9ulIn1",
      userPoolWebClientId: "63nl0ijviiqocbb2ms6lst1uu8",
    },
  });
}

configureAws();

export interface ResponseData {
  id: string;
  name: string;
}

export const MyComponent = ({
  data,
  token,
}: {
  data: (ResponseData | string)[];
  token: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [settingToken, setSettingToken] = useState(false);
  const [componentState, setComponentState] = useState(data);
  const [newAuthToken, setNewAuthToken] = useState("");
  const [logginIn, setLogginIn] = useState(false);

  async function loginUser() {
    setLogginIn(true);
    try {
      const user = await Auth.signIn("test@test.com", "Admin@123");
      const token = (await Auth.currentSession()).getIdToken().getJwtToken();
      setNewAuthToken(token);
    } catch (e) {
      console.error(e);
    }
    setLogginIn(false);
  }
  function changeState() {
    setComponentState([
      ...componentState,
      `New Item + ${componentState.length}`,
    ]);
  }

  async function setCookieStuff() {
    setSettingToken(true);
    await setCookie(newAuthToken);
    setSettingToken(false);
    setNewAuthToken("");
  }

  async function loggedInUserData() {
    console.log(await Auth.currentUserInfo());
  }
  return (
    <div>
      The initial fetched data is loaded on the server and is included in the
      initial HTML fetched, still has reactivity
      <button onClick={changeState}>Add Items</button>
      {loading ? (
        <div>Loading</div>
      ) : (
        componentState.map((item) => (
          <div key={typeof item === "string" ? item : item.id}>
            {typeof item === "string" ? item : item.name}
          </div>
        ))
      )}
      <button onClick={changeState}>Add Item</button>
      <br />
      <br />
      <br />
      <div>
        Here we are storing data in cookie store using a server side method
      </div>
      <div>Next uses this cookie store to store information</div>
      <div>
        <b>Old Token</b>
      </div>
      <div>{token || ""}</div>
      <div>New Auth Token</div>
      <input
        value={newAuthToken}
        onChange={(e) => setNewAuthToken(e.target.value)}
      ></input>
      <button onClick={setCookieStuff}>
        {!settingToken ? "Save" : "Saving"}
      </button>
      <br />
      <br />
      <br />
      <div>Client Side Login</div>
      <button disabled={logginIn} onClick={() => loginUser()}>
        Login here : Creds are hard-coded
      </button>{" "}
      <div>{logginIn && "Loading"}</div>
      <br />
      <br />
      <br />
      <br />
      <div>Log User Info</div>
      <button onClick={loggedInUserData}>Log</button>
      <br />
      <br />
      <br />
      <div>Log Out</div>
      <button
        onClick={async () => {
          Auth.signOut();
          await setCookie("");
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default MyComponent;
