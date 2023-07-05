import React, { useEffect, useState } from "react";
import axios from "axios";
import "./User.css";

interface User {
  gender: string;
  login: {
    username: string;
  };
  picture: {
    medium: string;
  };
}

const User: React.FC = () => {
  // user state
  const [users, setUsers] = useState<User[]>([]);

  // fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<{ results: User[] }>(
          "https://randomuser.me/api/?results=100"
        );
        console.log(response.data.results);
        setUsers(response.data.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  // get women only sorted by username
  const filteredUsers = users
    .filter((user) => user.gender === "female")
    .sort((a, b) => {
      if (a.login.username < b.login.username) {
        return -1;
      } else {
        return 1;
      }
    });

  return (
    <div className="container">
      <h1 className="usertitle">Welcome to the Facebook!</h1>
      <div className="usergrid">
        {filteredUsers.map((user, idx) => {
          return (
            <div key={idx} className="usercard">
              <div className="imagewrapper">
                <img src={user.picture.medium} alt="" className="userimage" />
              </div>
              <h2 className="username">{user.login.username}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default User;
