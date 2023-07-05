import { useState, useEffect } from "react";

interface User {
  dob: {
    age: number;
  };
  email: string;
  gender: string;
  login: {
    username: string;
  };
  picture: {
    large: string;
  };
  name: {
    first: string;
  };
}

const Users = () => {
  // user state
  const [users, setUsers] = useState<User[]>([]);

  // search state
  const [searchTerm, setSearchTerm] = useState<string>("");

  //   fetch data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=100");
        const data = await response.json();
        console.log({ data });
        setUsers(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  //   get women only sorted by name
  const filteredUsers = users
    .filter((user) => user.gender === "female")
    .sort((a, b) => (a.name.first < b.name.first ? -1 : 1))
    .filter((user) =>
      user.name.first.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="container">
      <input
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        placeholder="find your match"
      ></input>
      {filteredUsers.map((user) => {
        const {
          dob: { age },
          email,
          gender,
          login: { username },
          picture: { large },
          name: { first },
        } = user;
        return (
          <div className="user-card">
            <img className="user-image" src={large} alt="" />
            <h2 className="user-name">{first}</h2>
            <p className="user-age">
              {age}, {gender}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
