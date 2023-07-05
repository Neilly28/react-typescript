import React, { useState } from "react";

interface Todo {
  text: string;
  completed: boolean;
}

const Todo2: React.FC = () => {
  // todos state
  const [todos, setTodos] = useState<Todo[]>([
    { text: "do homework", completed: false },
    { text: "buy groceries", completed: false },
    { text: "wash dishes", completed: false },
  ]);

  const [newTodo, setNewTodo] = useState<string>("");

  // handleDelete
  const handleDelete = (idx: number) => {
    const filteredTodos = todos.filter((_, index) => index !== idx);
    setTodos(filteredTodos);
  };

  // handleDeleteAll
  const handleDeleteAll = () => {
    setTodos([]);
  };

  // handleComplete
  const handleComplete = (idx: number) => {
    const updatedTodos = todos.map((todo, index) => {
      return index === idx ? { ...todo, completed: !todo.completed } : todo;
    });
    setTodos(updatedTodos);
  };

  // handleSubmit
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
          type="text"
          required
          placeholder="new todo..."
          onChange={(e) => setNewTodo(e.target.value)}
          value={newTodo}
        />
        <button>Create</button>
      </form>
      <h1>{newTodo}</h1>
      {todos.map((todo, idx) => (
        <ul key={idx}>
          <li
            style={{
              listStyle: "none",
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleComplete(idx)}
            />
            {todo.text}
            <button onClick={() => handleDelete(idx)}>Delete</button>
          </li>
        </ul>
      ))}
      <button onClick={handleDeleteAll}>delete all</button>
    </div>
  );
};

export default Todo2;
