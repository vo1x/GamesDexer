import { SquareArrowOutUpRight } from "lucide-react";

type SearchResultsProps = {
  results: any[];
};

const ResultCard: React.FC<{ result: any }> = ({ result }) => {
  return (
    <div className="bg-[#161B2E] border rounded-lg border-slate-700 p-4 flex items-center justify-between h-max">
      <div className="overflow-hidden">
        <h1 className=" max-w-xl text-lg font-semibold py-2">{result.name}</h1>

        <div className="flex items-center gap-6">
          {/* <span className=" text-slate-400">{result.version || "Unkown"}</span> */}
          <a
            className=" text-slate-400"
            href={`https://${result.source}`}
            target="_blank"
          >
            {result.repack}
          </a>
        </div>
      </div>
      <a href={`${result.url}`} target="_blank">
        <SquareArrowOutUpRight className="text-slate-400 hover:text-slate-300" />
      </a>
    </div>
  );
};

const Results: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div className="custom-scrollbar relative pr-2 flex flex-col space-y-4 max-h-1/2 overflow-y-scroll max-w-3xl w-full">
      {results.map((result: any) => (
        <ResultCard result={result} />
      ))}
    </div>
  );
};

export default Results;
