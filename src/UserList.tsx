import { useEffect, useState } from "react";
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
              <a
                href={`${baseUrl}/users/${user.id}/albums`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Albums
              </a>{" "}
              |{" "}
              <a
                href={`${baseUrl}/users/${user.id}/todos`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Todos
              </a>{" "}
              |{" "}
              <a
                href={`${baseUrl}/users/${user.id}/posts`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Posts
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
