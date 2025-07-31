import { Link } from "react-router-dom";
import { trpc } from "../trpc";

export function PageOne() {
  const hello = trpc.hello.useQuery({ name: "Page One" });

  if (hello.isLoading) return <div className="p-4">Loading...</div>;
  if (hello.error) return <div className="p-4 text-red-500">Error: {hello.error.message}</div>;

  return (
    <div className="bg-red-500 p-8 max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">{hello.data}</h1>
      <nav>
        <Link 
          to="/pagetwo" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Page Two
        </Link>
      </nav>
    </div>
  );
}