import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import UserForm from "./UserForm";

async function getUsers() {
  const res = await fetch("http://localhost:3000/api/users");
  const data = await res.json();
  return data;
}

const UsersSWR = () => {
  const { data, error, isLoading } = useSWR("users", getUsers);
  
  const [editingUser, setEditingUser] = useState<{ _id: string; firstName: string } | null>(null);

  if (error) return <div>Error loading users</div>;
  if (isLoading) return <div>Loading...</div>;

  const handleDelete = async (id: string) => {
    if (confirm("are you sure")) {
      await fetch("http://localhost:3000/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      mutate("users"); 
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <UserForm editingUser={editingUser} clearEdit={() => setEditingUser(null)} />

      <h2>users list</h2>
      {data && data.length === 0 ? <p>no users</p> : null}
      
      {data?.map((user: any) => (
        <div key={user._id} style={{ display: "flex", gap: "15px", marginBottom: "10px", alignItems: "center" }}>
          <span>{user.firstName}</span>          
          <button onClick={() => setEditingUser(user)}>update</button>
          <button onClick={() => handleDelete(user._id)} style={{ color: "red" }}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default UsersSWR;