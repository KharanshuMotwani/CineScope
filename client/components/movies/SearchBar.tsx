import { Button } from "@/components/ui/button";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SearchBar({ large = false }: { large?: boolean }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const initial = params.get("q") ?? "";
  const [term, setTerm] = useState(initial);

  useEffect(() => {
    setTerm(initial);
  }, [initial]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams(params);
    if (term) next.set("q", term);
    else next.delete("q");
    navigate({ pathname: "/", search: next.toString() });
  };

  return (
    <form onSubmit={onSubmit} className={`flex w-full items-center gap-2 ${large ? "h-14" : "h-10"}`}>
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search movies (e.g. Inception, Pixar, Marvel)"
        className={`flex-1 rounded-md bg-muted/40 border border-border/60 px-4 text-sm outline-none focus:ring-2 focus:ring-primary/40 ${large ? "h-14 text-base" : "h-10"}`}
        aria-label="Search movies"
      />
      <Button type="submit" className={large ? "h-14 px-6 text-base" : "h-10 px-4"}>Search</Button>
    </form>
  );
}
