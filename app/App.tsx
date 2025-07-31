import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { trpc } from "./trpc";
import { PageOne } from "./pages/PageOne";
import { PageTwo } from "./pages/PageTwo";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/trpc",
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<PageOne />} />
            <Route path="/pagetwo" element={<PageTwo />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;