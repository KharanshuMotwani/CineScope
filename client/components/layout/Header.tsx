import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Header() {
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
    <header className="sticky top-0 z-40 border-b border-border/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent shadow-lg" />
          <span className="text-lg font-bold tracking-tight">CineScope</span>
        </Link>
        <form onSubmit={onSubmit} className="hidden md:flex items-center gap-2 w-[420px] max-w-full">
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search movies"
            className="flex-1 h-10 rounded-md bg-muted/40 border border-border/60 px-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            aria-label="Search movies"
          />
          <Button type="submit" className="h-10 px-4">Search</Button>
        </form>
      </div>
    </header>
  );
}
