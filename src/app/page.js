import Banner from "@/components/Banner";
import FeaturedLawyers from "@/components/FeaturedLawyers";
import TopLegalExperts from "@/components/TopLegalExperts";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedLawyers />
      <TopLegalExperts />
    </div>
  );
}
