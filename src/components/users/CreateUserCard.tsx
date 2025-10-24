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
import { UserForm } from "./UserForm";
import { UserFormValues } from "@/lib/validations/users";
import { useCreateUser } from "@/lib/api/users";

const CreateUserCard = () => {
  const router = useRouter();
  const createMutation = useCreateUser();

  const handleCreate = (data: UserFormValues) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast.success("User created successfully!");
        router.push("/users");
      },
      onError: () => {
        toast.error("Failed to create User");
      },
    });
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Create New User
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <UserForm
          onSubmit={handleCreate}
          isLoading={createMutation.isPending}
          formId="create-user-form"
        />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          type="submit"
          form="create-user-form"
          disabled={createMutation.isPending}
        >
          Create user
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateUserCard;
