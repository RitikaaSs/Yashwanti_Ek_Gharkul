import { Suspense } from "react";
import OnHoldProfile from "./OnHoldProfile";

export default function ResidentProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OnHoldProfile />
    </Suspense>
  );
}
