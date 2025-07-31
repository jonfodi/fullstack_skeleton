import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

export const router = t.router;
export const procedure = t.procedure;

export const appRouter = router({
  hello: procedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return `Hello ${input.name || "World"}!`;
    }),
});

export type AppRouter = typeof appRouter;