import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDeleteContact, useUpdateContact } from "@/lib/api/contacts";
import { Contact } from "@/lib/types/contacts";
import { ContactFormValues } from "@/lib/validations/contacts";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ContactForm } from "./ContactForm";
import Link from "next/link";

const UpdateContactCard = ({ contact }: { contact: Contact }) => {
  const router = useRouter();
  const updateMutation = useUpdateContact();
  const deleteMutation = useDeleteContact();

  const onSubmit = (data: ContactFormValues) => {
    updateMutation.mutate(
      { id: contact.id.toString(), data },
      {
        onSuccess: () => {
          toast.success("Contact updated successfully!");
        },
        onError: () => {
          toast.error("Failed to update contact");
        },
      }
    );
  };

  const handleDelete = () => {
    toast("Are you sure?", {
      description: `This will permanently delete "${contact.first_name} ${contact.last_name}"`,
      action: {
        label: "Delete",
        onClick: () => {
          deleteMutation.mutate(contact.id.toString(), {
            onSuccess: () => {
              toast.success("Contact deleted!");
              router.push("/contacts");
            },
            onError: () => {
              toast.error("Failed to delete");
            },
          });
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    });
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            <Link href="/contacts" className="text-primary">
              Contacts
            </Link>{" "}
            / {contact.first_name} {contact.last_name}
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ContactForm
          onSubmit={onSubmit}
          defaultValues={{
            first_name: contact.first_name,
            last_name: contact.last_name,
            organization_id: contact.organization_id.toString(),
            email: contact.email || "",
            phone: contact.phone || "",
            address: contact.address || "",
            city: contact.city || "",
            state: contact.state || "",
            country: contact.country || "",
            postal_code: contact.postal_code || "",
          }}
          isLoading={updateMutation.isPending}
          formId="update-contact-form"
        />
      </CardContent>
      <CardFooter className="flex gap-2 justify-between">
        <Button
          variant="destructive"
          type="button"
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
        >
          Delete contact
        </Button>
        <Button
          type="submit"
          variant="default"
          form="update-contact-form"
          disabled={updateMutation.isPending}
        >
          Update contact
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpdateContactCard;
