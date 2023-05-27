import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Popconfirm } from "antd";
import React, { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserListProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  onEditUser,
  onDeleteUser,
}) => {
  const [displayCount, setDisplayCount] = useState<number>(0);

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 3);
  };

  return (
    <div className="user-list">
      <Card style={{ width: 500,height: 404 }}>
      <div className="user-list">
        <h1>User List:</h1>
          {users.slice(displayCount, displayCount + 3).map((user, index) => (
              <Card style={{margin:"1rem 0rem",boxShadow: "0 0 5px 2px rgba(34, 193, 195, 1), 0 0 5px 2px rgba(253, 187, 45, 1)",}} bodyStyle={{display:"flex",justifyContent:"space-between"}}>
                <div>{user.name}</div>
                <div>{user.email}</div>
                <EditOutlined onClick={() => onEditUser(user)}/>
                <Popconfirm 
                title="Delete the task"
                description="Are you sure you want to delete this user?"
                // onConfirm={confirm}
                // onCancel={cancel}
                onConfirm={()=> onDeleteUser(user)}
                okText="Yes"
                cancelText="No"
                >
                <DeleteOutlined style={{color:"red"}}/>
                </Popconfirm>
              </Card>
          ))}
        {displayCount - 3 >= 0 && (
          <button onClick={() => setDisplayCount(displayCount - 3)}
          style={{ width: "5rem", height: "2rem", borderRadius: "1rem" , backgroundColor: "black", color: "white", border: "none"}}
          >
            Load Less
          </button>
        )}
        {displayCount + 3 < users.length && (
          <button onClick={handleLoadMore}
          style={{ width: "5rem", height: "2rem", borderRadius: "1rem" , backgroundColor: "black", color: "white", border: "none", marginLeft:"1rem"}}
          >Load More</button>
        )}
      </div>
      </Card>
    </div>
  );
};

export default UserList;
