// Definisanje tipova u TypeScriptu

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const baseUrl = "https://jsonplaceholder.typicode.com";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(`${baseUrl}/users`);
        setUsers(response.data);
      } catch (error) {
        setError("Failed to fetch users. Please try again later.");
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      {error && <ErrorMessage message={error} />}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>
              <strong>{user.name}</strong> ({user.email})
            </p>
            <p>
              <Link to={`/users/${user.id}/albums`}>Albums</Link> |{" "}
              <Link to={`/users/${user.id}/todos`}>Todos</Link> |{" "}
              <Link to={`/users/${user.id}/posts`}>Posts</Link>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
