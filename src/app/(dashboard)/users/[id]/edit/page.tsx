export default async function EditUserPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return (
    <div>
      <h1>Edit User {id}</h1>
    </div>
  );
}
