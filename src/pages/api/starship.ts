// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export type StarshipDTO = z.infer<typeof starshipSchema>;

export const availableStarshipsClasses = [
  "Starfighter",
  "Deep Space Mobile Battlestation",
];

export const starshipSchema = z.object({
  model: z.string().min(1).default(""),
  name: z.string().min(1).default(""),
  pilot: z
    .object({
      name: z.string().min(1),
      url: z.string().url(),
    })
    .default({ name: "", url: "" }),
  starship_class: z
    .enum(availableStarshipsClasses as [string])
    .default(availableStarshipsClasses[0]),
  cost_in_credits: z.number().min(1000).default(1000),
  length: z.string().min(1).default(""),
  max_atmosphering_speed: z.string().min(1).default(""),
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const body = starshipSchema.safeParse(req.body);

    if (!body.success) {
      res.status(400).json({ ...body.error.formErrors });
    }

    res.status(201).json({});
  } else {
    return res.status(500).send(`Only POST method`);
  }
}
