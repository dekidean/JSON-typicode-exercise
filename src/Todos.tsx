// Fecovanje i prikaz todos, dozvoljavanje usera da stikliraju(toggle)

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import { Todo } from "./models";
import { baseUrl } from "./config";

const Todos = () => {
  const { userId } = useParams<{ userId: string }>();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  const toggleCompletion = (id: number): void => {
    setTodos((prevTodos: Todo[]): Todo[] =>
      prevTodos.map((todo: Todo) =>
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
