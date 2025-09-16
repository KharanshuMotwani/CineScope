import { Link } from "react-router-dom";
import type { Movie } from "@/features/movies/api";

function msToMinutes(ms?: number) {
  if (!ms) return undefined;
  return Math.round(ms / 60000);
}

export default function MovieCard({ movie }: { movie: Movie }) {
  const minutes = msToMinutes(movie.durationMs);
  return (
    <div className="group rounded-xl overflow-hidden bg-card/60 border border-border/60 backdrop-blur hover:border-primary/50 transition-colors">
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="aspect-[2/3] w-full overflow-hidden bg-muted">
          {movie.artwork ? (
            <img
              src={movie.artwork}
              alt={movie.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full grid place-items-center text-muted-foreground">No image</div>
          )}
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold line-clamp-1" title={movie.title}>{movie.title}</h3>
            {movie.year ? (
              <span className="text-xs px-2 py-0.5 rounded bg-accent/20 text-accent-foreground/90 border border-accent/30">{movie.year}</span>
            ) : null}
          </div>
          <div className="mt-1 text-xs text-muted-foreground flex items-center gap-2">
            {movie.genre && <span className="truncate">{movie.genre}</span>}
            {minutes ? <span>• {minutes}m</span> : null}
            {movie.contentRating ? <span>• {movie.contentRating}</span> : null}
          </div>
        </div>
      </Link>
    </div>
  );
}
