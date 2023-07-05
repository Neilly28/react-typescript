import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  login: {
    username: string;
  };
  picture: {
    medium: string;
  };
  gender: string;
}

const User2 = () => {
  // user state
  const [users, setUsers] = useState<User[]>([]);

  //   fetch users
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

  //   get women only
  const filteredUsers = users.filter((user) => user.gender === "female");

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

export default User2;
