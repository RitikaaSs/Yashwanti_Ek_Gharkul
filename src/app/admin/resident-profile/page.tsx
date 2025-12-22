import { Suspense } from "react";
import ResidentProfile from "./ResidentProfile";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResidentProfile />
    </Suspense>
  );
}
