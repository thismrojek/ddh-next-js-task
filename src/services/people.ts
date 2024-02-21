import { APIList } from "@/types/api";
import { List } from "@/types/list";
import { People, PeopleAPI, SearchedPerson } from "@/types/people";

import { fetcher } from "@/utils/fetcher";
import { extractIdFromUrl } from "@/utils/url";

interface GetURLPayload {
  page?: number;
  search?: string;
}

export class PeopleService {
  private url = process.env.NEXT_PUBLIC_API_URL;
  private resourceIdentifier = "people";
  private itemsPerPage = 10;

  private getURL(searchParams: GetURLPayload = {}): string {
    if (!this.url) {
      throw new Error("No exist env: NEXT_PUBLIC_API_URL");
    }
    const apiURL = new URL(this.url + this.resourceIdentifier);

    Object.keys(searchParams).forEach((key) => {
      apiURL.searchParams.append(
        key,
        searchParams[key as keyof GetURLPayload]!.toString()
      );
    });

    return apiURL.href;
  }

  async getPage(page: number = 1): Promise<List<People>> {
    const url = this.getURL({ page });

    try {
      const response = await fetcher<APIList<PeopleAPI>>(url);

      const requiredFields: Partial<keyof Omit<People, "id">>[] = ["name"];

      if (!response.results) throw new Error("No data");

      requiredFields.forEach((field) => {
        if (!response.results.every((x) => x[field]))
          throw new Error(`No ${field} field`);
      });

      return {
        page,
        perPage: this.itemsPerPage,
        totalPage: Math.ceil(response.count / this.itemsPerPage),
        list: response.results.map((x) => ({
          name: x.name,
          id: extractIdFromUrl(x.url),
          url,
        })),
      };
    } catch (e) {
      throw new Error(`Error while fetching ${e}`);
    }
  }

  async getSearchResults(search: string): Promise<SearchedPerson[]> {
    const url = this.getURL({ search });

    try {
      const response = await fetcher<APIList<PeopleAPI>>(url);

      return response.results.map(({ url, name }) => ({
        name,
        url,
      }));
    } catch (e) {
      throw new Error(`Error while fetching ${e}`);
    }
  }

  async getDetails(id: number): Promise<PeopleAPI> {
    const url = `${this.getURL()}/${id}`;

    try {
      const response = await fetcher<PeopleAPI>(url);

      return response;
    } catch (e) {
      throw new Error(`Error while fetching ${e}`);
    }
  }
}
