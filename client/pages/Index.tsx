import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchMovies, type Movie } from "@/features/movies/api";
import SearchBar from "@/components/movies/SearchBar";
import MovieCard from "@/components/movies/MovieCard";

export default function Index() {
  const [params, setParams] = useSearchParams();
  const term = params.get("q") ?? "";
  const { data, isFetching } = useQuery({
    queryKey: ["search", term],
    queryFn: () => (term ? searchMovies(term) : Promise.resolve([] as Movie[])),
    staleTime: 1000 * 60,
  });

  const [sort, setSort] = useState<"relevance" | "year_desc" | "year_asc">(
    "relevance",
  );

  const results = useMemo(() => {
    const list = (data ?? []).slice();
    if (sort === "year_desc") list.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    if (sort === "year_asc") list.sort((a, b) => (a.year ?? 0) - (b.year ?? 0));
    return list;
  }, [data, sort]);

  const quickFilters = ["Inception", "Pixar", "Marvel", "Horror", "Comedy"];

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-[radial-gradient(1200px_500px_at_50%_-200px,hsl(var(--primary)/.25),transparent)]">
        <div className="px-6 lg:px-12 py-14 lg:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Discover your next favorite movie
            </h1>
            <p className="mt-4 text-muted-foreground text-base lg:text-lg">
              Search across popular titles, genres, studios, and more. Stream trailers, explore details, and build your watchlist.
            </p>
          </div>
          <div className="mt-8 max-w-3xl">
            <SearchBar large />
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              {quickFilters.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    const next = new URLSearchParams(params);
                    next.set("q", q);
                    setParams(next, { replace: false });
                  }}
                  className="px-3 py-1 rounded-full border border-border/60 bg-card/60 hover:border-primary/50 hover:text-primary transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold">{term ? `Results for “${term}”` : "Popular searches"}</h2>
          <div className="flex items-center gap-2 text-sm">
            <label htmlFor="sort" className="text-muted-foreground">Sort</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="h-9 rounded-md bg-muted/40 border border-border/60 px-2"
            >
              <option value="relevance">Relevance</option>
              <option value="year_desc">Year (newest)</option>
              <option value="year_asc">Year (oldest)</option>
            </select>
          </div>
        </div>

        {isFetching && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="rounded-xl aspect-[2/3] animate-pulse bg-muted/40" />
            ))}
          </div>
        )}

        {!isFetching && results.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p>No results yet. Try a quick filter above or search for a title.</p>
          </div>
        )}

        {!isFetching && results.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {results.map((m) => (
              <MovieCard key={m.id} movie={m} />)
            )}
          </div>
        )}
      </section>
    </div>
  );
}
