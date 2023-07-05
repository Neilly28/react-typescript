import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Counter from "./components/Counter";
import Pokemon from "./components/Pokemon";
import User from "./components/User";
import User2 from "./components/User2";
import User3 from "./components/User3";
import Products from "./components/Products";
import Blogs from "./components/Blogs";
import Todo from "./components/Todo";
import Countries from "./components/Countries";
import Poke from "./components/Poke";
import Products2 from "./components/Products2";
import TodoApp from "./components/TodoApp";
import Countries2 from "./components/Countries2";
import Poke2 from "./components/Poke2";
import Blogs2 from "./components/Blogs2";
import PersonInfo from "./components/PersonInfo";
import Countries3 from "./components/Countries3";
import TodoList from "./components/TodoList";
import Users from "./components/Users";
import Box from "./components/Box";
import TodoFinal from "./components/TodoFinal";
import Login from "./components/Login";
import UserFinal from "./components/UserFinal";
import Show from "./components/Show";
import CounterFinal from "./components/CounterFinal";
import ProductsFinal from "./components/ProductsFinal";
import Todo2 from "./components/Todo2";
import CountriesFinal from "./components/CountriesFinal";
import UserReview from "./components/UserReview";

function App() {
  return (
    <div>
      <h1>hello from typescript-react</h1>
      <Router>
        <Routes>
          <Route path="/" element={<UserReview />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
