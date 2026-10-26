import { useCallback, useEffect, useMemo, useReducer } from "react";

const STORAGE_KEY = "gallery-favourites";

type FavouritesState = {
  ids: string[];
};

type FavouritesAction = {
  type: "toggle";
  id: string;
};

function favouritesReducer(
  state: FavouritesState,
  action: FavouritesAction,
): FavouritesState {
  switch (action.type) {
    case "toggle":
      return state.ids.includes(action.id)
        ? { ids: state.ids.filter((id) => id !== action.id) }
        : { ids: [...state.ids, action.id] };
    default:
      return state;
  }
}

function readStoredFavourites(): FavouritesState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ids: [] };

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return { ids: [] };

    return { ids: parsed.filter((id): id is string => typeof id === "string") };
  } catch {
    return { ids: [] };
  }
}

export type UseFavouritesResult = {
  favourites: string[];
  isFavourite: (id: string) => boolean;
  toggleFavourite: (id: string) => void;
};

export function useFavourites(): UseFavouritesResult {
  const [state, dispatch] = useReducer(
    favouritesReducer,
    undefined,
    readStoredFavourites,
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.ids));
    } catch {
      // Storage can be unavailable (private mode, quota); favourites still work in memory.
    }
  }, [state.ids]);

  const favouriteIds = useMemo(() => new Set(state.ids), [state.ids]);

  const isFavourite = useCallback(
    (id: string) => favouriteIds.has(id),
    [favouriteIds],
  );

  const toggleFavourite = useCallback((id: string) => {
    dispatch({ type: "toggle", id });
  }, []);

  return { favourites: state.ids, isFavourite, toggleFavourite };
}
