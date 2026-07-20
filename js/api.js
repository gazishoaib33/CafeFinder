// api.js
// ------------------------------------------------------------------
// Wraps every Google Maps / Places / Geocoding / Distance Matrix call.
// UI code should never touch the `google` namespace directly — it
// should call functions exported from here. Keeps API quirks and any
// future API-version migrations contained to a single file.
//
// Will be filled in as we build:
//   - Map init                       (Step 4)
//   - Nearby / Text search            (Step 5)
//   - Place Details (photos, hours)    (Step 6)
//   - Distance / travel time            (Step 10)
// ------------------------------------------------------------------

export const CafeAPI = {
  // Populated in later steps.
};
