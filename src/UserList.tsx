import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Definisanje tipova u TypeScriptu
interface User {
  id: number;
  name: string;
  email: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const baseUrl = "https://jsonplaceholder.typicode.com";

  useEffect(() => {
    //  Fecovanje Usera

    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(`${baseUrl}/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User List</h1>
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
