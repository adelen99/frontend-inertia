"use client";

import { useContact } from "@/lib/api/contacts";
import UpdateContactCard from "./UpdateContactCard";
import { Spinner } from "../ui/spinner";
import { ErrorState } from "../ui/error-state";

const ContactDetails = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useContact(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }
  if (error) return <ErrorState />;
  if (!data) return null;

  const contact = data.data.attributes;
  return <UpdateContactCard contact={contact} />;
};

export default ContactDetails;
