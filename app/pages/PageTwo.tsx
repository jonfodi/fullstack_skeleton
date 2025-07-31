import { Link } from "react-router-dom";
import { trpc } from "../trpc";

export function PageTwo() {
  const hello = trpc.hello.useQuery({ name: "Page Two" });

  if (hello.isLoading) return <div className="p-4">Loading...</div>;
  if (hello.error) return <div className="p-4 text-red-500">Error: {hello.error.message}</div>;

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-green-600">{hello.data}</h1>
      <nav>
        <Link 
          to="/" 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Page One
        </Link>
      </nav>
    </div>
  );
}