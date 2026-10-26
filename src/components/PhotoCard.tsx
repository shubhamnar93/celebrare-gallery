import { memo } from "react";
import type { ImageJson } from "../types";

type PhotoCardProps = {
  photo: ImageJson;
  isFavourite: boolean;
  onToggleFavourite: (id: string) => void;
};

export const PhotoCard = memo(function PhotoCard({
  photo,
  isFavourite,
  onToggleFavourite,
}: PhotoCardProps) {
  return (
    <li className="group relative overflow-hidden rounded-2xl bg-zinc-200 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-300/60">
      <img
        src={photo.download_url}
        alt={`Photo by ${photo.author}`}
        loading="lazy"
        className="aspect-4/3 w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 via-black/30 to-transparent p-4 pt-10">
        <p className="text-sm font-semibold text-white">{photo.author}</p>
        <p className="mt-0.5 text-xs text-white/70">
          {photo.width} × {photo.height}
        </p>
      </div>

      <a
        href={photo.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open photo by ${photo.author} on Unsplash`}
        className="absolute inset-0 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
      />

      <button
        type="button"
        onClick={() => onToggleFavourite(photo.id)}
        aria-pressed={isFavourite}
        aria-label={
          isFavourite
            ? `Remove ${photo.author} from favourites`
            : `Add ${photo.author} to favourites`
        }
        className="absolute top-3 right-3 z-10 flex size-9 items-center justify-center rounded-full bg-black/35 text-white ring-1 ring-white/25 backdrop-blur-sm transition hover:bg-black/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-90"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill={isFavourite ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`size-4 transition ${isFavourite ? "text-rose-400" : "text-white"}`}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
        </svg>
      </button>
    </li>
  );
});
