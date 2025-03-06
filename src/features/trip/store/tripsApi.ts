import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import { getTripById, getTrips } from "@services/api";

import type { Trip } from "../type";

export const tripsApi = createApi({
  reducerPath: "tripsApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    getTrips: build.query<Trip[], void>({
      queryFn: async () => {
        const data = await getTrips();
        return { data };
      },
    }),
    getTripDetails: build.query<Trip, string | undefined>({
      queryFn: async (tripId: string) => {
        const data = await getTripById(tripId);
        return { data };
      },
    }),
  }),
});

export const { useGetTripsQuery, useGetTripDetailsQuery } = tripsApi;
