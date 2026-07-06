import Banner from "@/components/homepage/Banner";
import CallToAction from "@/components/homepage/CallToAction";
import Featured from "@/components/homepage/Featured";
import Image from "next/image";

export default function Home() {
  return (
   <>
    <Banner />
    <Featured />
    <CallToAction />  
   </>
  );
}
