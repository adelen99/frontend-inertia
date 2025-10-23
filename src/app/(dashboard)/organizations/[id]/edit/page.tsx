import OrganizationDetails from "@/components/organizations/OrganizationDetails";

const EditPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return <OrganizationDetails id={id} />;
};

export default EditPage;
