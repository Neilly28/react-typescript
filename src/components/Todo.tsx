import { useState } from "react";

interface Todo {
  text: string;
  completed: boolean;
}

const Todo = () => {
  // todos state
  const [todos, setTodos] = useState<Todo[]>([
    { text: "play basketball", completed: false },
    { text: "play video games", completed: false },
    { text: "read book", completed: false },
  ]);

  //   new todos state
  const [newTodo, setNewTodo] = useState<string>("");

  //   handleChange
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
  };

  return (
    <div>
      <h1>to do list</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">todo item</label>
        <input
          onChange={(e) => setNewTodo(e.target.value)}
          type="text"
          required
          placeholder="your todos..."
          value={newTodo}
        />
        <button>Submit</button>
      </form>

      <h1>{newTodo}</h1>

      <ul>
        {todos.map((todo, idx) => {
          return (
            <li
              style={{
                listStyleType: "none",
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              <input
                checked={todo.completed}
                type="checkbox"
                onChange={() => handleChange(idx)}
              />
              {todo.text}
              <button onClick={() => handleDelete(idx)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;
