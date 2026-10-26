import { memo } from "react";

type ErrorStateProps = {
  message: string;
  onRetry: () => void;
  isRetrying: boolean;
};

export const ErrorState = memo(function ErrorState({
  message,
  onRetry,
  isRetrying,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm shadow-red-100">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-50 text-red-600">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6"
          >
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
          </svg>
        </div>

        <h2 className="mt-5 text-lg font-semibold text-zinc-900">
          Couldn’t load the gallery
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">
          Something went wrong while fetching the photos. Check your connection
          and try again.
        </p>
        <p className="mt-4 rounded-lg bg-zinc-50 px-3 py-2 font-mono text-xs break-words text-zinc-500">
          {message || "Unknown error"}
        </p>

        <button
          type="button"
          onClick={onRetry}
          disabled={isRetrying}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isRetrying && (
            <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          )}
          {isRetrying ? "Retrying…" : "Try again"}
        </button>
      </div>
    </div>
  );
});
