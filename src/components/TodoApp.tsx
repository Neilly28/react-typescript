import { useState } from "react";

interface Todo {
  text: string;
  completed: boolean;
}

const TodoApp = () => {
  // todos state
  const [todos, setTodos] = useState<Todo[]>([
    { text: "play basketball", completed: false },
    { text: "play video games", completed: false },
    { text: "read book", completed: false },
  ]);

  //   new todo state
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

  //   handleSubmit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo("");
  };

  return (
    <div>
      <h1>My Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="your task..."
          onChange={(e) => setNewTodo(e.target.value)}
          value={newTodo}
          required
        />
        <button>Create New</button>
      </form>
      <ul>
        {todos.map((todo, idx) => {
          return (
            <li
              key={idx}
              style={{
                display: "flex",
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed ? true : false}
                onChange={() => handleChange(idx)}
              />
              {todo.text}
              <button onClick={() => handleDelete(idx)}>delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoApp;
