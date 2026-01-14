import { Suspense } from "react";
import ProfileResident from "./ProfileResident";

export default function ProfileResidentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileResident />
    </Suspense>
  );
}
