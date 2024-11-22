//Fecovanje userovih(korisnikovih) postova(objava), svaki link vodi do posta

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface Post {
  id: number;
  title: string;
}

const Posts = () => {
  const { userId } = useParams<{ userId: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}/posts`
        );
        setPosts(response.data);
      } catch {
        setError("Error fetching posts.");
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <div>
      <h2>Posts</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Posts;
