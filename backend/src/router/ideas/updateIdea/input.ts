import { z } from "zod";
import { zCreateIdeaTrpcScheme } from "../createIdea/input";

export const zUpdateIdeaTrpcScheme = zCreateIdeaTrpcScheme.extend({
  ideaId: z.string().min(1),
});
