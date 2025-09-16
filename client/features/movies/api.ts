export type Movie = {
  id: number;
  title: string;
  artwork: string;
  genre?: string;
  releaseDate?: string;
  year?: number;
  description?: string;
  previewUrl?: string;
  durationMs?: number;
  contentRating?: string;
};

const upscaleArtwork = (url: string | undefined) => {
  if (!url) return "";
  return url.replace(/\d+x\d+bb\.jpg/, "600x600bb.jpg");
};

export async function searchMovies(term: string): Promise<Movie[]> {
  const url = new URL("https://itunes.apple.com/search");
  url.searchParams.set("media", "movie");
  url.searchParams.set("limit", "50");
  url.searchParams.set("term", term);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch movies");
  const data = await res.json();
  const items = (data.results ?? []) as any[];
  return items.map((i) => ({
    id: i.trackId,
    title: i.trackName,
    artwork: upscaleArtwork(i.artworkUrl100),
    genre: i.primaryGenreName,
    releaseDate: i.releaseDate,
    year: i.releaseDate ? new Date(i.releaseDate).getFullYear() : undefined,
    description: i.longDescription || i.shortDescription,
    previewUrl: i.previewUrl,
    durationMs: i.trackTimeMillis,
    contentRating: i.contentAdvisoryRating,
  }));
}

export async function getMovieById(id: string | number): Promise<Movie | null> {
  const url = new URL("https://itunes.apple.com/lookup");
  url.searchParams.set("id", String(id));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch movie");
  const data = await res.json();
  const item = (data.results ?? [])[0];
  if (!item) return null;
  return {
    id: item.trackId,
    title: item.trackName,
    artwork: upscaleArtwork(item.artworkUrl100),
    genre: item.primaryGenreName,
    releaseDate: item.releaseDate,
    year: item.releaseDate
      ? new Date(item.releaseDate).getFullYear()
      : undefined,
    description: item.longDescription || item.shortDescription,
    previewUrl: item.previewUrl,
    durationMs: item.trackTimeMillis,
    contentRating: item.contentAdvisoryRating,
  };
}
