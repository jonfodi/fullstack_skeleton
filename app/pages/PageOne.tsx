import { Link } from "react-router-dom";
import { trpc } from "../trpc";

export function PageOne() {
  const hello = trpc.hello.useQuery({ name: "Page One" });

  if (hello.isLoading) return <div>Loading...</div>;
  if (hello.error) return <div>Error: {hello.error.message}</div>;

  return (
    <div>
      <h1>{hello.data}</h1>
      <nav>
        <Link to="/pagetwo">Go to Page Two</Link>
      </nav>
    </div>
  );
}