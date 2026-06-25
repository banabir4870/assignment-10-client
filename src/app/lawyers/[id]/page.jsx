import LawyerDetailsPage from "@/components/LawyerDetailsPage";

export default async function Page({ params }) {
    const {id} = await params;
    console.log('id:', id)
    return <LawyerDetailsPage id={id} />;
}