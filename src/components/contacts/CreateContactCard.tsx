"use client";
import { ContactForm } from "./ContactForm";
import { useCreateContact } from "@/lib/api/contacts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { ContactFormValues } from "@/lib/validations/contacts";

const CreateContactCard = () => {
  const router = useRouter();
  const createMutation = useCreateContact();

  const handleCreate = (data: ContactFormValues) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Contact created successfully!");
        router.push("/contacts");
      },
      onError: () => {
        toast.error("Failed to create contact");
      },
    });
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Create New Contact
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ContactForm
          onSubmit={handleCreate}
          isLoading={createMutation.isPending}
          formId="create-contact-form"
        />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          type="submit"
          form="create-contact-form"
          disabled={createMutation.isPending}
        >
          Create contact
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateContactCard;
