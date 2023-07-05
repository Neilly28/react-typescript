import React, { useEffect, useState } from "react";

interface User {
  name: {
    first: string;
  };
  dob: {
    age: number;
  };
  email: string;
  gender: string;
  picture: {
    medium: string;
  };
}

const UserReview = () => {
  // user state
  const [users, setUsers] = useState<User[]>([]);

  //   search state
  const [searchTerm, setSearchTerm] = useState<string>("");

  //   fetch data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=100");
        const data = await response.json();
        console.log(data.results);
        setUsers(data.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  //   filter women only
  const filteredUsers = users
    .filter((user) => user.gender === "female")
    .sort((a, b) => (a.name.first < b.name.first ? -1 : 1))
    .filter((user) =>
      user.name.first.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      <h1>Welcome to User Review!</h1>
      <input
        type="text"
        placeholder="find your match..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <h2>{searchTerm}</h2>

      {filteredUsers.map((user, idx) => {
        return (
          <div key={idx}>
            <img src={user.picture.medium} alt="" />
            <h2>{user.name.first}</h2>
            <p>{user.email}</p>
          </div>
        );
      })}
    </div>
  );
};

export default UserReview;
