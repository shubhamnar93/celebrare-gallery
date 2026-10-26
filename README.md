# Celebrare Gallery

A photo gallery built with React, TypeScript, Vite and Tailwind CSS. Photos are
loaded once from the [Picsum](https://picsum.photos) API and can then be searched
by author and marked as favourites — both handled entirely on the client.

## Features

- **Responsive grid** — 1 column on mobile, 2 on tablet (`md:`), 4 on laptop and
  up (`lg:`).
- **Search by author** — filters the already-fetched list as you type. No extra
  API calls and no page reloads.
- **Favourites** — the heart on each card toggles a favourite, stored with
  `useReducer` and persisted to `localStorage` (key: `gallery-favourites`), so it
  survives a refresh.
- **Loading and error states** — a spinner while fetching, and an error panel
  with the failure message and a retry button.
- **Empty state** — shown when a search matches no authors.

## Tech stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (via `@tailwindcss/vite`) — no custom/native CSS; `src/index.css`
  only imports Tailwind.

## Getting started

Requires Node.js 20.19+ or 22.12+ (Vite's supported range) and
[pnpm](https://pnpm.io) — the repo ships a `pnpm-lock.yaml`.

```bash
pnpm install
pnpm dev       # start the dev server
```

| Script         | Description                               |
| -------------- | ----------------------------------------- |
| `pnpm dev`     | Start the Vite dev server with HMR        |
| `pnpm build`   | Type-check (`tsc -b`) and build to `dist` |
| `pnpm preview` | Serve the production build locally        |
| `pnpm lint`    | Run ESLint                                |

## Project structure

```
src/
  App.tsx                    page shell: header + <Gallery />
  components/
    Gallery.tsx              search state, filtering, loading/error/empty branches
    SearchInput.tsx          controlled author search input
    PhotoCard.tsx            photo card with favourite toggle
    LoadingState.tsx         spinner
    ErrorState.tsx           error panel with retry
  hooks/
    useFetchPhotos.ts        fetches photos; returns { photos, loading, error, retry }
    useFavourites.ts         useReducer + localStorage favourites
  types.ts                   ImageJson shape returned by the API
```

`Gallery` is the only component that touches data: it calls `useFetchPhotos`
(which owns all `fetch` logic) and `useFavourites`, keeps the search term in
local state, memoises the filtered list with `useMemo`, and wraps the search
handler in `useCallback`.

## Notes

- Photos come from `https://picsum.photos/v2/list?limit=30`; the request is
  aborted on unmount, and non-2xx responses are treated as errors.
- Favourite persistence degrades gracefully: if `localStorage` is unavailable
  (private mode, quota), favourites still work for the current session.
