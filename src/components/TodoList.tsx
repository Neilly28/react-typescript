import { useState } from "react";

interface Todo {
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { text: "play basketball", completed: false },
    { text: "play video games", completed: false },
    { text: "read book", completed: false },
  ]);

  const [newTodo, setNewTodo] = useState<string>("");

  //   update completed
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

  //   delete one
  const handleDelete = (idx: number) => {
    const filteredTodos = todos.filter((todo) => todos.indexOf(todo) !== idx);
    setTodos(filteredTodos);
  };

  //   delete all
  const handleDeleteAll = () => {
    const filteredTodos = todos.filter((todo) => !todo);
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
      <h1>my todo list</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button>create</button>
      </form>
      <ul>
        {todos.map((t, idx) => {
          return (
            <li
              style={{
                listStyle: "none",
                textDecoration: t.completed ? "line-through" : "none",
              }}
            >
              <input
                type="checkbox"
                checked={t.completed ? true : false}
                onChange={() => handleChange(idx)}
              />
              {t.text}
              <button onClick={() => handleDelete(idx)}>delete</button>
            </li>
          );
        })}
        {todos.length > 0 && (
          <button onClick={handleDeleteAll}>delete all</button>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
