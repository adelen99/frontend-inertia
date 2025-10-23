"use client";
import { OrganizationForm } from "./organization-form";
import { useCreateOrganization } from "@/lib/api/organizations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { OrganizationFormData } from "@/lib/validations/organization";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const CreateOrganizationCard = () => {
  const router = useRouter();
  const createMutation = useCreateOrganization();

  const handleCreate = (data: OrganizationFormData) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Organization created successfully!");
        router.push("/organizations");
      },
      onError: () => {
        toast.error("Failed to create organization");
      },
    });
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Create New Organization
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <OrganizationForm
          onSubmit={handleCreate}
          submitLabel="Create organization"
          isLoading={createMutation.isPending}
        />
      </CardContent>
    </Card>
  );
};

export default CreateOrganizationCard;
