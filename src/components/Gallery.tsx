import { useCallback, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { useFavourites } from "../hooks/useFavourites";
import { useFetchPhotos } from "../hooks/useFetchPhotos";
import { ErrorState } from "./ErrorState";
import { LoadingState } from "./LoadingState";
import { PhotoCard } from "./PhotoCard";
import { SearchInput } from "./SearchInput";

export function Gallery() {
  const { photos, loading, error, retry } = useFetchPhotos();
  const { favourites, isFavourite, toggleFavourite } = useFavourites();
  const [query, setQuery] = useState("");

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  const clearSearch = useCallback(() => setQuery(""), []);

  const filteredPhotos = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return photos;

    return photos.filter((photo) => photo.author.toLowerCase().includes(term));
  }, [photos, query]);

  const hasResults = filteredPhotos.length > 0;

  return (
    <section aria-label="Photo gallery">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={query}
          onChange={handleSearch}
          onClear={clearSearch}
        />

        {!loading && !error && (
          <p aria-live="polite" className="text-sm text-zinc-500">
            {filteredPhotos.length} of {photos.length} photos
            {favourites.length > 0 &&
              ` · ${favourites.length} favourite${favourites.length === 1 ? "" : "s"}`}
          </p>
        )}
      </div>

      {error ? (
        <ErrorState message={error} onRetry={retry} isRetrying={loading} />
      ) : loading ? (
        <LoadingState />
      ) : hasResults ? (
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={isFavourite(photo.id)}
              onToggleFavourite={toggleFavourite}
            />
          ))}
        </ul>
      ) : (
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white/60 p-8 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-500">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <p className="mt-4 text-base font-semibold text-zinc-900">
            No photos match “{query.trim()}”
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-500">
            Try a different author name, or clear the search to see the whole
            gallery.
          </p>
          <button
            type="button"
            onClick={clearSearch}
            className="mt-5 rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          >
            Clear search
          </button>
        </div>
      )}
    </section>
  );
}
