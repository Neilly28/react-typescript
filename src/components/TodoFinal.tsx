import { toFormData } from "axios";
import { useState } from "react";

interface Todo {
  text: string;
  completed: boolean;
}

const TodoFinal = () => {
  // todos state
  const [todos, setTodos] = useState([
    { text: "do homework", completed: false },
    { text: "buy groceries", completed: false },
    { text: "wash dishes", completed: false },
  ]);

  //   newtodo
  const [newTodo, setNewTodo] = useState<string>("");

  //   handlechange
  const handleChange = (idx: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todos.indexOf(todo) === idx) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };

  //   handleDelete
  const handleDelete = (idx: number) => {
    const filteredTodos = todos.filter((todo) => todos.indexOf(todo) !== idx);
    setTodos(filteredTodos);
  };

  //   handlesubmit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo("");
  };

  return (
    <div>
      <h1>My Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="your task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button>create new</button>
      </form>
      <ul>
        {todos.map((todo, idx) => {
          return (
            <li
              style={{
                listStyle: "none",
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              <input
                type="checkbox"
                onChange={() => handleChange(idx)}
                checked={todo.completed}
              />
              {todo.text}
              {todo.completed && (
                <span style={{ color: "green" }}> completed!</span>
              )}
              <button onClick={() => handleDelete(idx)}>delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoFinal;
