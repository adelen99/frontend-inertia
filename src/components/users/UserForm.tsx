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
  const { register, handleSubmit, control } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={formId}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">First Name*</Label>
            <Input
              id="first_name"
              type="text"
              {...register("first_name")}
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="last_name">Last Name*</Label>
            <Input
              id="last_name"
              type="last_name"
              {...register("last_name")}
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email*</Label>
            <Input
              id="email"
              type="tel"
              {...register("email")}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {" "}
          <div className="grid gap-2">
            <Label htmlFor="password">Password*</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Role*</Label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="owner">Owner</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
      </div>
    </form>
  );
};
