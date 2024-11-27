//Detalji posta

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Post, Comment } from "./models";

const PostDetails = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const postResponse = await axios.get<Post>(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        setPost(postResponse.data);

        const commentsResponse = await axios.get<Comment[]>(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
        );
        setComments(commentsResponse.data);
      } catch (error) {
        setError("Error fetching post or comments.");
        console.error("Error:", error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {post && (
        <>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </>
      )}
      <h3>Comments</h3>
      <ul>
        {comments.map((comment: Comment) => (
          <li key={comment.id}>
            <strong>{comment.name}</strong>: {comment.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostDetails;
