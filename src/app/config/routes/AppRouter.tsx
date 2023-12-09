import { Route, Routes } from "react-router-dom";

import Authlayout from "@features/ui/layout/Authlayout";
import HomePage from "@pages/home";
import LoginPage from "@pages/login";
import NotFoundPage from "@pages/not-found";
import SignupPage from "@pages/sign-up";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<Authlayout />}>
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
