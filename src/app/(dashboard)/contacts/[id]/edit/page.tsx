import ContactDetails from "@/components/contact-details";

const EditPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return <ContactDetails id={id} />;
};

export default EditPage;
