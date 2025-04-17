import React from "react";
import {  Route, Routes,Navigate } from "react-router";
import { authRoutes, publicRoutes,myPracticeRoutes,mockRoutes } from "./router.link";
import Feature from "../feature";
import AuthFeature from "../authFeature";
import Login from "../auth/login/login";
import MyFeature from "../myFeature";
import ProtectedRoute from "./ProtectedRoute";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../core/data/redux/store";
import MockFeature from "../mockFeature";

const ALLRoutes: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  return (
    <>
      <Routes>

        <Route path="/" element={token ? <Navigate to="/index" replace /> : <Login />} />

          <Route element={<ProtectedRoute><Feature /></ProtectedRoute>}>
            {authRoutes.map((route, idx) => (
              <Route path={route.path} element={route.element} key={idx} />
            ))}
          </Route>

        <Route element={<AuthFeature />}>
          {publicRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>

         {/* This route is protected and for only practices */}

        <Route element={<ProtectedRoute><MyFeature /></ProtectedRoute>}>
          {myPracticeRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
        <Route element={<MockFeature />}>
          {mockRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default ALLRoutes;
