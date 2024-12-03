//Fecovanje i prikaz user albuma sa linkovima za prikaz slika

import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import { Album } from "./models";

const Albums = () => {
  const { userId } = useParams<{ userId: string | undefined }>();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchAlbums = useCallback(async () => {
    if (!userId) return;

    const baseUrl = import.meta.env.VITE_BASE_URL;

    if (!baseUrl) {
      setError("Base URL is not defined in the environment variables.");
      return;
    }

    try {
      const response = await axios.get<Album[]>(
        `${baseUrl}/users/${userId}/albums`
      );
      setAlbums(response.data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch albums. Please try again later.");
      console.error("Error fetching albums:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return (
    <div>
      <h2>Albums</h2>
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <ul>
          {albums.map((album: Album) => (
            <li key={album.id}>
              <Link to={`/albums/${album.id}/photos`}>{album.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Albums;
