import React from "react";
import Hero from "../sections/Hero.jsx";
import FeaturedRow from "../sections/FeaturedRow.jsx";
import Process from "../sections/Process.jsx";
import CTA from "../sections/CTA.jsx";
import { SectionDivider } from "../components/Decor.jsx";

export default function Home({ setPage, onSelect }) {
  return (
    <>
      <Hero setPage={setPage} />
      <SectionDivider />
      <FeaturedRow setPage={setPage} onSelect={onSelect} />
      <SectionDivider />
      <Process />
      <SectionDivider />
      <CTA setPage={setPage} />
    </>
  );
}
