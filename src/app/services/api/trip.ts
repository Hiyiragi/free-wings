import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import type { Trip } from "@features/trip/type";
import { auth, firestore } from "@services/firebase";

export async function addTrip(trip: Trip) {
  if (!auth.currentUser) {
    throw Error("You are not authorized to make this change");
  }

  await setDoc(doc(firestore, "trips", trip.id), {
    ...trip,
    userId: auth.currentUser.uid,
  });
}

export async function getTrips() {
  if (!auth.currentUser) {
    throw Error("You are not authorized to make this change");
  }

  const userTripsQuery = query(
    collection(firestore, "trips"),
    where("userId", "==", auth.currentUser.uid),
  );

  const querySnapshot = await getDocs(userTripsQuery);
  return querySnapshot.docs.map((doc) => doc.data() as Trip);
}

export async function getTripById(tripId: string | undefined) {
  if (!auth.currentUser) {
    throw Error("You are not authorized to make this change");
  }

  if (!tripId) {
    throw new Error("Trip not found!");
  }

  const tripRef = doc(firestore, "trips", tripId);

  const tripSnap = await getDoc(tripRef);

  if (!tripSnap.data()) {
    throw new Error("Trip not found!");
  }

  return tripSnap.data() as Trip;
}
