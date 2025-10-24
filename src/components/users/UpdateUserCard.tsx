import { useDeleteUser, useUpdateUser } from "@/lib/api/users";
import { User } from "@/lib/types/users";
import { UserFormValues } from "@/lib/validations/users";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Button } from "../ui/button";
import { UserForm } from "./UserForm";
import Link from "next/link";

const UpdateUserCard = ({ user }: { user: User }) => {
  const router = useRouter();
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();

  const onSubmit = (data: UserFormValues) => {
    updateMutation.mutate(
      { id: user.id.toString(), data },
      {
        onSuccess: () => {
          toast.success("User updated successfully!");
        },
        onError: () => {
          toast.error("Failed to update user");
        },
      }
    );
  };

  const handleDelete = () => {
    toast("Are you sure?", {
      description: `This will permanently delete "${user.first_name} ${user.last_name}"`,
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteMutation.mutateAsync(user.id.toString());
            toast.success("User deleted!");
            router.push("/users");
          } catch (error) {
            toast.error("Failed to delete");
          }
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
            <Link href="/users" className="text-primary">
              Users
            </Link>{" "}
            / {user.first_name}
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <UserForm
          onSubmit={onSubmit}
          defaultValues={{
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            email: user.email || "",
            password: user.password || "",
            role: user.role || "user",
          }}
          isLoading={updateMutation.isPending}
          formId="update-user-form"
        />
      </CardContent>
      <CardFooter className="flex gap-2 justify-between">
        <Button
          variant="destructive"
          type="button"
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
        >
          Delete user
        </Button>
        <Button
          type="submit"
          variant="default"
          form="update-user-form"
          disabled={updateMutation.isPending}
        >
          Update user
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpdateUserCard;
