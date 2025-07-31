import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./router";

const app = express();
const port = 4000;

app.use(
  "/",
  createExpressMiddleware({
    router: appRouter,
  }),
);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});