import { useState, useEffect } from "react";

interface User {
  email: string;
  picture: {
    large: string;
  };
  gender: string;
  dob: {
    age: number;
  };
}

const User3 = () => {
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

  return (
    <div>
      {users.map((user) => {
        return (
          <div>
            <img src={user.picture.large} alt="" />
            <h1>{user.email}</h1>
            <h2>{user.gender}</h2>
            <h3>{user.dob.age}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default User3;
