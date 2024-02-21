import Peoples from "@/components/peoples";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'All people',
}

export default function PeoplePage() {
  return <Peoples />;
}
