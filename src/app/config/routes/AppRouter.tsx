import { Route, Routes } from "react-router-dom";

import Authlayout from "@features/ui/layout/Authlayout";
import DashboardPage from "@pages/account/dashboard";
import HomePage from "@pages/home";
import LoginPage from "@pages/login";
import NotFoundPage from "@pages/not-found";
import SignupPage from "@pages/sign-up";

import { AppRoutes } from ".";

export default function AppRouter() {
  return (
    <Routes>
      <Route path={AppRoutes.home} element={<HomePage />} />
      <Route element={<Authlayout />}>
        <Route path={AppRoutes.signUP} element={<SignupPage />} />
        <Route path={AppRoutes.login} element={<LoginPage />} />
      </Route>
      <Route path={AppRoutes.dashboard} element={<DashboardPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
