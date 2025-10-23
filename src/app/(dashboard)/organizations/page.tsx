import OrganizationsContent from "@/components/organizations/OrganizationContent";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

export default function ContactsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <Spinner size="lg" />
        </div>
      }
    >
      <OrganizationsContent />
    </Suspense>
  );
}
