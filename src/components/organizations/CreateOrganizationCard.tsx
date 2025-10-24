"use client";
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

import { OrganizationForm } from "./OrganizationForm";
import { OrganizationFormData } from "@/lib/validations/organization";
import { useCreateOrganization } from "@/lib/api/organizations";

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
          isLoading={createMutation.isPending}
          formId="create-org-form"
        />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          type="submit"
          form="create-org-form"
          disabled={createMutation.isPending}
        >
          Create organization
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateOrganizationCard;
