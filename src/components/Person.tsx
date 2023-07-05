import React from "react";

interface PersonProps {
  name: string;
  age: number;
  email: string;
}

const Person: React.FC<PersonProps> = ({ name, age, email }) => {
  return (
    <div>
      <h1>{name}</h1>
      <h1>{age}</h1>
      <h1>{email}</h1>
    </div>
  );
};

export default Person;
