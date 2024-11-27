// Fecovanje i prikaz slika specificnog albuma

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import { Photo } from "./models";

const Photos = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get<Photo[]>(
          `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
        );
        setPhotos(response.data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch photos. Please try again later.");
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, [albumId]);

  return (
    <div>
      <h2>Photos</h2>
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <ul>
          {photos.map((photo: Photo) => (
            <li key={photo.id}>
              <p>{photo.title}</p>
              <img src={photo.url} alt={photo.title} width="200" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Photos;
