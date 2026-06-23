import React from "react";
import UsersSWR from "@/components/UsersSWR";
import login from "./login";
import { useRouter } from "next/navigation";

const ManageUsersPage = () => {
  const router = useRouter();
  return (
    <main style={{ maxWidth: "600px", margin: "50px auto", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>manage user</h1>
      <hr style={{ marginBottom: "30px" }} />
      <UsersSWR />
      <button 
        onClick={() => router.push("/users/login")} 
        style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
      >
        Go to Login
      </button>
    </main>
  );
};

export default ManageUsersPage;