//Fecovanje i prikaz user albuma sa linkovima za prikaz slika

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface Album {
  id: number;
  title: string;
}

const Albums = () => {
  const { userId } = useParams<{ userId: string }>();
  const [albums, setAlbums] = useState<Album[]>([]);
  const baseUrl = "https://jsonplaceholder.typicode.com";

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get<Album[]>(
          `${baseUrl}/users/${userId}/albums`
        );
        setAlbums(response.data);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, [userId]);

  return (
    <div>
      <h2>Albums</h2>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <Link to={`/albums/${album.id}/photos`}>{album.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Albums;
