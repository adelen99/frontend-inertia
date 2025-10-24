import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useDeleteOrganization,
  useUpdateOrganization,
} from "@/lib/api/organizations";
import { Organization } from "@/lib/types/organization";
import { OrganizationFormData } from "@/lib/validations/organization";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { OrganizationForm } from "./OrganizationForm";
import Link from "next/link";

const UpdateOrganizationCard = ({
  organization,
}: {
  organization: Organization;
}) => {
  const router = useRouter();
  const updateMutation = useUpdateOrganization();
  const deleteMutation = useDeleteOrganization();

  const onSubmit = (data: OrganizationFormData) => {
    updateMutation.mutate(
      { id: organization.id.toString(), data },
      {
        onSuccess: () => {
          toast.success("Organization updated successfully!");
        },
        onError: () => {
          toast.error("Failed to update organization");
        },
      }
    );
  };

  const handleDelete = () => {
    toast("Are you sure?", {
      description: `This will permanently delete "${organization.name}"`,
      action: {
        label: "Delete",
        onClick: () => {
          deleteMutation.mutate(organization.id.toString(), {
            onSuccess: () => {
              toast.success("Organization deleted!");
              router.push("/organizations");
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
            <Link href="/organizations" className="text-primary">
              Organizations
            </Link>{" "}
            / {organization.name}
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <OrganizationForm
          onSubmit={onSubmit}
          defaultValues={{
            name: organization.name,
            email: organization.email || "",
            phone: organization.phone || "",
            address: organization.address || "",
            city: organization.city || "",
            state: organization.state || "",
            country: organization.country || "",
            postal_code: organization.postal_code || "",
          }}
          isLoading={updateMutation.isPending}
          formId="update-org-form"
        />
      </CardContent>
      <CardFooter className="flex gap-2 justify-between">
        <Button
          variant="destructive"
          type="button"
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
        >
          Delete organization
        </Button>
        <Button
          type="submit"
          variant="default"
          form="update-org-form"
          disabled={updateMutation.isPending}
        >
          Update organization
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpdateOrganizationCard;
