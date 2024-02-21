import { StarshipDTO } from "@/pages/api/starship";
import { StarshipsService } from "@/services/starships";
import { useMutation } from "@tanstack/react-query";

export const useCreateStarship = () => {
  const startshipsService = new StarshipsService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: StarshipDTO) => startshipsService.create(payload),
  });

  return {
    createStarshipAsync: mutateAsync,
    isPending,
  };
};
