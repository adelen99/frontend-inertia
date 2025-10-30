import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useAllOrganizations } from "@/lib/api/organizations";
import {
  contactFormSchema,
  ContactFormValues,
} from "@/lib/validations/contacts";

interface ContactFormProps {
  onSubmit: (data: ContactFormValues) => void;
  defaultValues?: Partial<ContactFormValues>;
  isLoading?: boolean;
  formId?: string;
}

export const ContactForm = ({
  onSubmit,
  defaultValues = {
    first_name: "",
    last_name: "",
    organization_id: "",
    organization_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
  },
  isLoading = false,
  formId = "contact-form",
}: ContactFormProps) => {
  const { data: organizationsData, isLoading: isLoadingOrgs } =
    useAllOrganizations();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={formId}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="first_name">First Name*</Label>
            <Input
              id="first_name"
              type="text"
              {...register("first_name")}
              disabled={isLoading}
            />
            {errors.first_name && (
              <p className="text-sm text-destructive">
                {errors.first_name.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="last_name">Last Name*</Label>
            <Input
              id="last_name"
              type="text"
              {...register("last_name")}
              disabled={isLoading}
            />
            {errors.last_name && (
              <p className="text-sm text-destructive">
                {errors.last_name.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="organization_id">Organization*</Label>
            <Controller
              name="organization_id"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading || isLoadingOrgs}
                >
                  <SelectTrigger id="organization_id">
                    <SelectValue placeholder="Select an organization" />
                  </SelectTrigger>
                  <SelectContent>
                    {organizationsData?.data.map((org) => (
                      <SelectItem
                        key={org.attributes.id}
                        value={org.attributes.id.toString()}
                      >
                        {org.attributes.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.organization_id && (
              <p className="text-sm text-destructive">
                {errors.organization_id.message}
              </p>
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
        </div>

        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              type="text"
              {...register("address")}
              disabled={isLoading}
            />
          </div>

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
