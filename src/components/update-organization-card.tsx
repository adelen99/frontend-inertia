import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useDeleteOrganization,
  useUpdateOrganization,
} from "@/lib/api/organizations";
import { Organization } from "@/lib/types/organization";
import {
  OrganizationFormData,
  organizationSchema,
} from "@/lib/validations/organization";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const UpdateOrganizationCard = ({
  organization,
}: {
  organization: Organization;
}) => {
  const router = useRouter();
  const updateMutation = useUpdateOrganization();
  const deleteMutation = useDeleteOrganization();
  const { register, handleSubmit } = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: organization.name,
      email: organization.email || "",
      phone: organization.phone || "",
      address: organization.address || "",
      city: organization.city || "",
      state: organization.state || "",
      country: organization.country || "",
      postal_code: organization.postal_code || "",
    },
  });

  const onSubmit = (data: OrganizationFormData) => {
    updateMutation.mutate(
      { id: organization.id.toString(), data },
      {
        onSuccess: () => {
          toast.success("Organization updated successfully!");
        },
        onError: () => {
          toast.error("Failed to update organization:");
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
            Organizations/ {organization.name}
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} id="org-form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name:</Label>
                <Input
                  id="name"
                  type="name"
                  {...register("name")}
                  // disabled={isPending}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="email">Email</Label>
                </div>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  //disabled={isPending}
                />
              </div>{" "}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="phone">Phone</Label>
                </div>
                <Input
                  id="phone"
                  type="phone"
                  {...register("phone")}
                  //disabled={isPending}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="address">Address</Label>
                </div>
                <Input
                  id="address"
                  type="address"
                  {...register("address")}
                  //disabled={isPending}
                />
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="city">City</Label>
                </div>
                <Input
                  id="city"
                  type="city"
                  {...register("city")}
                  //disabled={isPending}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="state">State</Label>
                </div>
                <Input
                  id="state"
                  type="state"
                  {...register("state")}
                  //disabled={isPending}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="country">Country</Label>
                </div>
                <Input
                  id="country"
                  type="country"
                  {...register("country")}
                  //disabled={isPending}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="postal_code">Postal Code</Label>
                </div>
                <Input
                  id="postal_code"
                  type="postal_code"
                  {...register("postal_code")}
                  //disabled={isPending}
                />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex gap-2 capitalize  justify-between">
        <Button variant="destructive" type="button" onClick={handleDelete}>
          Delete organization
        </Button>
        <Button type="submit" variant="default" form="org-form">
          Update organization
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpdateOrganizationCard;
