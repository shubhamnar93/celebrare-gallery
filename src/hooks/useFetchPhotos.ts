import { useCallback, useEffect, useState } from "react";
import type { ImageJson } from "../types";

const PHOTOS_URL = "https://picsum.photos/v2/list?limit=30";

export type UseFetchPhotosResult = {
  photos: ImageJson[];
  loading: boolean;
  error: string;
  retry: () => void;
};

export function useFetchPhotos(url: string = PHOTOS_URL): UseFetchPhotosResult {
  const [photos, setPhotos] = useState<ImageJson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        return res.json() as Promise<ImageJson[]>;
      })
      .then((data) => {
        setPhotos(data);
        setError("");
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      });

    return () => controller.abort();
  }, [url, attempt]);

  const retry = useCallback(() => {
    setLoading(true);
    setAttempt((n) => n + 1);
  }, []);

  return { photos, loading, error, retry };
}
