import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userFormSchema, UserFormValues } from "@/lib/validations/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";

interface UserForm {
  onSubmit: (data: UserFormValues) => void;
  defaultValues?: Partial<UserFormValues>;
  isLoading?: boolean;
  formId?: string;
}

export const UserForm = ({
  onSubmit,
  defaultValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "user",
  },
  isLoading = false,
  formId = "user-form",
}: UserForm) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
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
              className={cn(errors.first_name && "border-red-500")}
              aria-invalid={!!errors.first_name}
            />
            {errors.first_name && (
              <span className="text-sm text-red-500">
                {errors.first_name.message}
              </span>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="last_name">Last Name*</Label>
            <Input
              id="last_name"
              type="text"
              {...register("last_name")}
              disabled={isLoading}
              className={cn(errors.last_name && "border-red-500")}
              aria-invalid={!!errors.last_name}
            />
            {errors.last_name && (
              <span className="text-sm text-red-500">
                {errors.last_name.message}
              </span>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email*</Label>
            <Input
              id="email"
              type="email" //
              {...register("email")}
              disabled={isLoading}
              className={cn(errors.email && "border-red-500")}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="password">Password*</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              disabled={isLoading}
              className={cn(errors.password && "border-red-500")}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="role">Role*</Label>
            <Controller
              name="role"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <SelectTrigger
                      className={cn(
                        "w-full",
                        fieldState.error && "border-red-500"
                      )}
                    >
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="owner">Owner</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <span className="text-sm text-red-500">
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>
        </div>
      </div>
    </form>
  );
};
