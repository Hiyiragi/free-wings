import { Route, Routes } from "react-router-dom";

import AccountLayout from "@features/ui/layout/AccountLayout/AccountLayout";
import Authlayout from "@features/ui/layout/Authlayout";
import AddTripPage from "@pages/account/add-trip";
import DashboardPage from "@pages/account/dashboard";
import TripDetailsPage from "@pages/account/trips/trip-details";
import TripsPage from "@pages/account/trips/trips";
import HomePage from "@pages/home";
import LoginPage from "@pages/login";
import NotFoundPage from "@pages/not-found";
import SignupPage from "@pages/sign-up";

import { AppRoutes } from "..";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path={AppRoutes.home} element={<HomePage />} />
      <Route element={<Authlayout />}>
        <Route path={AppRoutes.signUP} element={<SignupPage />} />
        <Route path={AppRoutes.login} element={<LoginPage />} />
      </Route>
      {/* Account Pages */}
      <Route
        element={
          <ProtectedRoute>
            <AccountLayout />
          </ProtectedRoute>
        }
      >
        <Route path={AppRoutes.dashboard} element={<DashboardPage />} />
        <Route path={AppRoutes.addTrip} element={<AddTripPage />} />
        <Route path={AppRoutes.trips} element={<TripsPage />} />
        <Route
          path={`${AppRoutes.trips}/:tripId`}
          element={<TripDetailsPage />}
        />
      </Route>
      {/* Not Found Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
