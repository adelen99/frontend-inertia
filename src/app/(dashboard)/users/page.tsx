import { Spinner } from "@/components/ui/spinner";
import UsersContent from "@/components/users/UsersContent";
import { Suspense } from "react";

export default function UsersPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <Spinner size="lg" />
        </div>
      }
    >
      <UsersContent />
    </Suspense>
  );
}
