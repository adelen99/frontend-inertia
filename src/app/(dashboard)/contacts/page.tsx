import ContactsContent from "@/components/contacts/ContactsContent";
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
      <ContactsContent />
    </Suspense>
  );
}
