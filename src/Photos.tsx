// Fecovanje i prikaz slika specificnog albuma

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Photo {
  id: number;
  title: string;
  url: string;
}

const Photos = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
        );
        setPhotos(response.data);
      } catch (err) {
        console.error("Error fetching photos:", err);
        setError("Failed to fetch photos. Please try again later.");
      }
    };

    fetchPhotos();
  }, [albumId]);

  return (
    <div>
      <h2>Photos</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ul>
          {photos.map((photo) => (
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
