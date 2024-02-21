import ROUTES from "@/utils/routes";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(ROUTES.people.root);
}
