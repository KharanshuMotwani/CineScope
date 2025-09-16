import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "@/features/movies/api";
import { Button } from "@/components/ui/button";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieById(id!),
    enabled: !!id,
  });

  if (isLoading) return <div className="py-24 text-center">Loading…</div>;
  if (isError || !movie)
    return (
      <div className="py-24 text-center">
        <p className="mb-6">We couldn't load this movie.</p>
        <Button asChild>
          <Link to="/">Back to search</Link>
        </Button>
      </div>
    );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
      <div className="rounded-xl overflow-hidden bg-card/60 border border-border/60">
        {movie.artwork ? (
          <img
            src={movie.artwork}
            alt={movie.title}
            className="w-full h-auto"
          />
        ) : null}
      </div>
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{movie.title}</h1>
            <p className="mt-2 text-muted-foreground">
              {[movie.year, movie.genre, movie.contentRating]
                .filter(Boolean)
                .join(" • ")}
            </p>
          </div>
          <Button asChild variant="secondary">
            <Link to="/">Back</Link>
          </Button>
        </div>
        {movie.previewUrl ? (
          <div className="mt-6 rounded-xl overflow-hidden border border-border/60 bg-card/60">
            <video controls className="w-full aspect-video bg-black">
              <source src={movie.previewUrl} type="video/mp4" />
            </video>
          </div>
        ) : null}
        {movie.description ? (
          <div className="mt-6 prose prose-invert max-w-none">
            <p>{movie.description}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
