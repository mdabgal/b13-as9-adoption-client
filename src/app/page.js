
import FeaturedPets from "@/components/FeaturedPets";
import Hero from "@/components/Hero";
import PetCareTips from "@/components/PetCareTips";
import SuccessStories from "@/components/SuccessStories";
import Volunteers from "@/components/Volunteers";
import WhyAdopt from "@/components/WhyAdopt";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero/>
      <FeaturedPets/>
      <WhyAdopt/>
      <SuccessStories/>
      <PetCareTips/>
      <Volunteers/>
    </div>
  );
}
