import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setDataLayout,
  setDataTheme,
} from "../../data/redux/themeSettingSlice";
import ImageWithBasePath from "../imageWithBasePath";
import {
  setExpandMenu,
  setMobileSidebar,
  toggleMiniSidebar,
} from "../../data/redux/sidebarSlice";
import { useState } from "react";
import { all_routes } from "../../../feature-module/router/all_routes";

const MockHeader = () => {
  const routes = all_routes;
  

  return (
    <>
      {/* Header */}
      <div className="header">
        <h5>hello</h5>
      </div>
      {/* /Header */}
    </>
  );
};

export default MockHeader;
