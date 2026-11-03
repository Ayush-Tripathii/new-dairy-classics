import Hero from "@/components/home/Hero";
import StickerBoard from "@/components/home/StickerBoard";
import Carousel3D from "@/components/Carousel3D";
import SwipeMatch from "@/components/SwipeMatch";
import FlavourMoment from "@/components/home/FlavourMoment";
import FreshDrops from "@/components/home/FreshDrops";
import BigNumbers from "@/components/home/BigNumbers";
import { FindUs, HomeRecipes, PolaroidWall, FinalCTA } from "@/components/home/HomeExtras";

export default function Home() {
  return (
    <>
      <Hero />
      <StickerBoard />
      <Carousel3D />
      <SwipeMatch />
      <FlavourMoment />
      <FreshDrops />
      <BigNumbers />
      <FindUs />
      <HomeRecipes />
      <PolaroidWall />
      <FinalCTA />
    </>
  );
}
