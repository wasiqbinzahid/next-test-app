import React from "react";
import { Outlet } from "react-router";

export const ParentComponent: React.FC = () => {
  return (
    <div>
      Welcome to parent components
      <div>
        Child data here
        <Outlet />
      </div>
    </div>
  );
};

export default ParentComponent;
