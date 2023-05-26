import { Card } from "antd";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserInputProps {
  onAddUser: (user: User) => void;
  selectedUser?: User | null;
}

const UserInput: React.FC<UserInputProps> = ({
  onAddUser,
  selectedUser,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [selectedUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      const editedUser: User = { name, email, id: selectedUser.id };
      onAddUser(editedUser);
    } else {
      const newUser: User = { name, email, id: uuidv4() };
      onAddUser(newUser);
    }
  };

  const handleClear = () => {
    setName("");
    setEmail("");
  };

  return (
    <div className="user-input">
      <Card style={{ width: 500, height:404 }}>
        <h1>Enter User Details</h1>
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "20px 20px 20px 0px",
            display: "grid",
            gridTemplateColumns: "repeat(1,1fr)",
            gap: "2rem",
          }}
        >
          <label style={{ display: "flex", justifyContent: "space-between", marginTop:"2rem",alignItems:"center" }}>
            <h3>
              Name
              </h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                border: "2px solid black",
                borderRadius: "4px",
                height: "30px",
                width: "85%",
                padding: "0px 10px",
              }}
            />
          </label>
          <label style={{ display: "flex", justifyContent: "space-between", marginTop:"1rem",alignItems:"center" }}>
            <h3>
            Email
            </h3>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                border: "2px solid black",
                borderRadius: "4px",
                height: "30px",
                width: "85%",
                padding: "0px 10px",
              }}
            />
          </label>
          <div
            className="submit-button"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "1rem",
              margin: "30px 0px 0px 0px",
            }}
          >
            <button
              type="submit"
              style={{ width: "5rem", height: "2rem", borderRadius: "1rem" , backgroundColor: "black", color: "white", border: "none"}}
            >
              Submit
            </button>
            <button type="button" 
            style={{ width: "5rem", height: "2rem", borderRadius: "1rem" , backgroundColor: "black", color: "white", border: "none"}}
            onClick={handleClear}>
              Clear
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default UserInput;
