import { memo } from "react";
import type { ChangeEventHandler } from "react";

type SearchInputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClear: () => void;
};

export const SearchInput = memo(function SearchInput({
  value,
  onChange,
  onClear,
}: SearchInputProps) {
  return (
    <div className="relative w-full sm:max-w-sm">
      <label htmlFor="author-search" className="sr-only">
        Search photos by author
      </label>

      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-zinc-400"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>

      <input
        id="author-search"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search by author…"
        autoComplete="off"
        className="w-full rounded-full border border-zinc-200 bg-white py-2.5 pr-10 pl-11 text-sm text-zinc-900 shadow-sm transition placeholder:text-zinc-400 hover:border-zinc-300 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-900/10 focus:outline-none"
      />

      {value !== "" && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      )}
    </div>
  );
});
