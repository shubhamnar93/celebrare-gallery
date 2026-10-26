export function LoadingState() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <div
        role="status"
        aria-label="Loading gallery"
        className="size-12 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900"
      />
      <p className="text-sm font-medium tracking-wide text-zinc-500">
        Loading gallery…
      </p>
    </div>
  );
}
