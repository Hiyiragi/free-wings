import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import { addTrip, getTripById, getTrips, updateTrip } from "@services/api";

import type { Trip } from "../type";

export const tripsApi = createApi({
  reducerPath: "tripsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Trips"],
  endpoints: (build) => ({
    getTrips: build.query<Trip[], void>({
      queryFn: async () => {
        const data = await getTrips();
        return { data };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Trips" as const, id })),
              { type: "Trips", id: "LIST" },
            ]
          : [{ type: "Trips", id: "LIST" }],
    }),
    getTrip: build.query<Trip, string | undefined>({
      queryFn: async (tripId: string) => {
        const data = await getTripById(tripId);
        return { data };
      },
      providesTags: (_, __, id) => [{ type: "Trips", id }],
    }),
    updateTrip: build.mutation<boolean, { id: string; data: Partial<Trip> }>({
      queryFn: async (data) => {
        await updateTrip(data.id, data.data);
        return { data: true };
      },
      invalidatesTags: (_, __, { id }) => [{ type: "Trips", id }],
    }),
    addTrip: build.mutation<boolean, Trip>({
      queryFn: async (trip) => {
        await addTrip(trip);
        return { data: true };
      },
      invalidatesTags: () => [{ type: "Trips", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTripsQuery,
  useGetTripQuery,
  useUpdateTripMutation,
  useAddTripMutation,
} = tripsApi;
