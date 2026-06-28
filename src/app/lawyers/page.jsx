import { Suspense } from "react";
import BrowseLawyersPage from "./BrowseLawyers";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowseLawyersPage />
    </Suspense>
  );
}