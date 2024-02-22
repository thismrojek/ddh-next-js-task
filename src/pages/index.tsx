import ROUTES from "@/utils/routes";
import Link from "next/link";

export default function Home() {
  return (
    <Link href={ROUTES.people.root}>Check out Star Wars people</Link>
  )
}
