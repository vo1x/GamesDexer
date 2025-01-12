import { Loader2, Search } from "lucide-react";
import Results from "./components/Results";
import { ChangeEvent, useState, KeyboardEvent } from "react";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState([]);
  const fetchSearchResults = async (
    query: string,
    repacks: string[] = ["steamrip", "fitgirl", "dodi", "xatab"]
  ) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://apidexer.vercel.app/search?q=${encodeURIComponent(
          query
        )}&repacks=${encodeURIComponent(repacks.join(","))}`
      );

      const data = await response.json();
      if (data.success) {
        setSearchResults(data.results);
        setLoading(false);

        return;
      }
    } catch (error: any) {
      setLoading(false);
      console.error(error.message);
      return;
    }
  };
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="flex flex-col h-screen w-screen items-center space-y-8 justify-center p-8">
        <div className="flex w-full max-w-2xl flex-col items-center space-y-8">
          <h1 className="text-5xl font-bold text-slate-300">GamesDexer</h1>

          <div className="flex w-96 items-center gap-2 rounded-full border border-slate-700 bg-[#161B2E] p-2 px-3">
            <button
              onClick={() => fetchSearchResults(inputValue)}
              className="rounded-full bg-[#445173] p-2 text-slate-400 transition-all duration-200 hover:text-slate-100"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Search />}
            </button>

            <input
              type="text"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setInputValue(event.target.value)
              }
              placeholder="Search any game"
              className="w-full rounded-full bg-[#0F131F] p-2 px-4 text-lg outline-none"
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  fetchSearchResults(inputValue);
                }
              }}
            />
          </div>
        </div>

        {searchResults?.length > 0 && <Results results={searchResults} />}
      </div>
    </>
  );
}

export default App;
