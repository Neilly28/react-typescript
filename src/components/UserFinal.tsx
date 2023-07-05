import { useState, useEffect } from "react";

interface User {
  name: {
    first: string;
  };
  email: string;
  dob: {
    age: number;
  };
  picture: {
    large: string;
  };
  gender: string;
}

const UserFinal = () => {
  // users state
  const [users, setUsers] = useState<User[]>([]);

  //   search state
  const [searchTerm, setSearchTerm] = useState<string>("");

  //   select state
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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

  //   filter women only
  const filteredUsers = users
    .filter((user) => user.gender === "female")
    .sort((a, b) => (a.name.first < b.name.first ? -1 : 1))
    .filter((user) =>
      user.name.first.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // handleSelect
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    const selectedUser = users.find((user) => user.name.first === selectedName);
    setSelectedUser(selectedUser || null);
  };

  return (
    <div>
      <h1>welcome to the user page</h1>
      {/* <input
        type="text"
        placeholder="find your match..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredUsers.map((user) => {
        return (
          <div>
            <img src={user.picture.large} alt="" />
            <h2>{user.name.first}</h2>
            <p>{user.email}</p>
            <p>{user.dob.age}</p>
          </div>
        );
      })} */}
      <select onChange={handleSelect}>
        <option value="">select your match</option>
        {filteredUsers.map((user) => {
          return <option value={user.name.first}>{user.name.first}</option>;
        })}
      </select>
      <div>
        <img src={selectedUser?.picture.large} alt="" />
        <h1>{selectedUser?.name.first}</h1>
      </div>
    </div>
  );
};

export default UserFinal;
