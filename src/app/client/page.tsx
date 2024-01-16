"use client";
import React, { useEffect, useState } from "react";
import { Stuff } from "./components/Stuff";
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    setShouldRender(true);
  }, []);
  if (!shouldRender) return <div></div>;
  return (
    <Router>
      <Stuff />;
    </Router>
  );
}
