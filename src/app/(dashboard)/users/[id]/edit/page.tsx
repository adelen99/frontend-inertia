import UserDetails from "@/components/users/UserDetails";

export default async function EditUserPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <UserDetails id={id} />;
}
