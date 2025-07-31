import { Link } from "react-router-dom";
import { trpc } from "../trpc";

export function PageTwo() {
  const hello = trpc.hello.useQuery({ name: "Page Two" });

  if (hello.isLoading) return <div>Loading...</div>;
  if (hello.error) return <div>Error: {hello.error.message}</div>;

  return (
    <div>
      <h1>{hello.data}</h1>
      <nav>
        <Link to="/">Go to Page One</Link>
      </nav>
    </div>
  );
}