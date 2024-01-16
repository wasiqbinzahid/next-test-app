import { Link, Routes, Route } from "react-router-dom";
import ParentComponent from "./Parent";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Stuff = () => {
  const navigate = useNavigate();
  const myFn = useCallback(
    (e: PopStateEvent) => {
      const newState = e.state;
      history.pushState(newState, "", window.location.pathname);
      e.preventDefault();
      console.log(e);
      const target = window.location.pathname;
      console.log("ze target is ", target);
      if (e.state) {
        navigate(e.state.url, {
          replace: true,
        });
      }
    },
    [navigate]
  );
  useEffect(() => {
    window.addEventListener("popstate", myFn);
    return () => window.removeEventListener("popstate", myFn);
  }, [navigate]);
  return (
    <div>
      <ul>
        <li>
          <Link to="/client/A">Home</Link>
        </li>
        <li>
          <Link to="/client/about">About</Link>
        </li>
      </ul>

      <Routes>
        <Route path="/client/A" element={<ParentComponent />} />
        <Route path="/client/about" element={<h1>About</h1>} />
      </Routes>
    </div>
  );
};
