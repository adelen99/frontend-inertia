import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  OrganizationFormData,
  organizationSchema,
} from "@/lib/validations/organization";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface OrganizationFormProps {
  onSubmit: (data: OrganizationFormData) => void;
  defaultValues?: Partial<OrganizationFormData>;
  isLoading?: boolean;
  formId?: string; // Add formId prop
}

export const OrganizationForm = ({
  onSubmit,
  defaultValues = {
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
  },
  isLoading = false,
  formId = "org-form", // Default formId
}: OrganizationFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={formId}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Name*</Label>
            <Input
              id="name"
              type="text"
              {...register("name")}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              type="text"
              {...register("address")}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              type="text"
              {...register("city")}
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              type="text"
              {...register("state")}
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              type="text"
              {...register("country")}
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="postal_code">Postal Code</Label>
            <Input
              id="postal_code"
              type="text"
              {...register("postal_code")}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </form>
  );
};
