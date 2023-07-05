import { useState } from "react";

interface User {
  email: string;
  password: string;
}

const Login = () => {
  // email and password state
  const [email, setEmail] = useState<string>("");
  console.log(typeof setEmail);

  const [password, setPassword] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");

  //   handlesubmit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length > 6) {
      setUsers([...users, { email, password }]);
      setEmail("");
      setPassword("");
      setError("");
    } else {
      setError("password needs to be minimum 6 characters");
    }
  };

  return (
    <div>
      <h1>Signup Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="">password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Signup</button>
        <p style={{ color: "red" }}>{error}</p>
      </form>
      <h2>Users Mailing List</h2>
      <ol>
        {users.map((user) => {
          return (
            <div>
              <h3>{user.email}</h3>
              {/* <h3>{user.password}</h3> */}
            </div>
          );
        })}
      </ol>
    </div>
  );
};

export default Login;
