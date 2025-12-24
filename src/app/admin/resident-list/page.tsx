import { Suspense } from "react";
import ResidentList from "./ResidentList";

export default function ResidentListPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResidentList />
    </Suspense>
  );
}
