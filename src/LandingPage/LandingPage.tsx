import React, { useEffect, useState } from 'react';
import UserInput from '../components/UserInput';
import UserList from '../components/UserList';

interface User {
  id: string;
  name: string;
  email: string;
}

const LandingPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
    const handleAddUser = (user: User) => {
        console.log(user);
        if (selectedUser) {
            console.log(selectedUser,"selectedUser");
          const updatedUsers = users.map((existingUser: User) => {
            if (existingUser.id === selectedUser.id) {
              return user;
            }
            return existingUser;
          });
          setUsers(updatedUsers);
          localStorage.setItem('users', JSON.stringify(updatedUsers));
          alert('User details have been updated');
        } else {
          console.log(user,"user");
          const updatedUsers = [...users, user];
          setUsers(updatedUsers);
          localStorage.setItem('users', JSON.stringify(updatedUsers));
          alert('User details have been saved');
        }
      };
  
    const handleEditUser = (editedUser: User) => {
      setSelectedUser(editedUser);
    };
  
    const handleDeleteUser = (userToDelete: User) => {
      if (window.confirm('Are you sure you want to delete this user?')) {
        const updatedUsers = users.filter((user) => user.id !== userToDelete.id);
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      }
    };


    useEffect(() => {
        const usersFromLocalStorage = localStorage.getItem('users');
        if (usersFromLocalStorage) {
            setUsers(JSON.parse(usersFromLocalStorage));
        }
    }, []);
    

  return (
    <div className="app">
      <UserInput onAddUser={handleAddUser} selectedUser={selectedUser}/>
      <UserList
        users={users}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  );
};

export default LandingPage;
