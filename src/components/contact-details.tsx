"use client";

import UpdateContactCard from "./update-contact-card";
import { useContact } from "@/lib/api/contacts";

const ContactDetails = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useContact(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!data) return null;

  const contact = data.data.attributes;
  return <UpdateContactCard contact={contact} />;
};

export default ContactDetails;
