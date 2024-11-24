// Fecovanje i prikaz todos, dozvoljavanje usera da stikliraju(toggle)

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const Todos = () => {
  const { userId } = useParams<{ userId: string }>();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const baseUrl = "https://jsonplaceholder.typicode.com";

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get<Todo[]>(
          `${baseUrl}/users/${userId}/todos`
        );
        setTodos(response.data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch todos. Please try again later.");
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [userId]);

  const toggleCompletion = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <h2>Todos</h2>
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleCompletion(todo.id)}
                />
                {todo.title}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todos;
