import { StarshipDTO } from "@/pages/api/starship";

export class StarshipsService {
  private internalApiEndpoint = "/api/";
  private resourceIdentifier = "starship";

  private getURL(): string {
    const apiURL = this.internalApiEndpoint + this.resourceIdentifier;

    return apiURL;
  }

  async create(payload: StarshipDTO) {
    const url = this.getURL();

    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers,
      });

      return response;
    } catch (e) {
      throw new Error(`Error while fetching ${e}`);
    }
  }
}
