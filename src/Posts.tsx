//Fecovanje userovih(korisnikovih) postova(objava), svaki link vodi do posta

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import { Post } from "./models";
import { baseUrl } from "./config";

const Posts = () => {
  const { userId } = useParams<{ userId: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(
          `${baseUrl}/users/${userId}/posts`
        );
        setPosts(response.data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch posts. Please try again later.");
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <div>
      <h2>Posts</h2>
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <ul>
          {posts.map((post: Post) => (
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
