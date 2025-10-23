import OrganizationDetails from "@/components/organization-details";

const OrganizationPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return <OrganizationDetails id={id} />;
};

export default OrganizationPage;
