import { PersonDetails } from "@/components/person-details";
import { PeopleService } from "@/services/people";
import { PeopleAPI } from "@/types/people";

interface Params {
  id: number;
}

interface PageProps {
  personDetails: PeopleAPI;
}

export async function getServerSideProps({ params }: { params: Params }) {
  // If the data will change frequently, I would suggest using a tanstackQuery, passing the data fetched on the server side as initialData.
  const peopleService = new PeopleService();
  const response = await peopleService.getDetails(params.id);

  if (!response.name) {
    return {
      notFound: true,
    }
  }

  return { props: { personDetails: response } };
}

export default function PersonDetailsPage({ personDetails }: PageProps) {
  return <PersonDetails person={personDetails} />;
}
