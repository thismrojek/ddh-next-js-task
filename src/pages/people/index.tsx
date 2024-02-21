import Peoples from "@/components/people/peoples";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'All people',
}

export default function PeoplePage() {
  return <Peoples />;
}
