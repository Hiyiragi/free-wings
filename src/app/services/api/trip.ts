import { doc, setDoc } from "firebase/firestore";

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
