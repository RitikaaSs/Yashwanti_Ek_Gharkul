"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "../pro_utils/constantFun";

interface CandidateDataModel {
  id: number
  user_id: number
  name: string
  date_of_birth: string
  age: number
  gender: string
  blood_group: string
  status: string
}

export default function AdminLayout() {
  const [listData, setlistData] = useState<CandidateDataModel[]>();
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();
useEffect(() => {
  async function getUser() {
    const res = await fetch("/api/auth/me");
    const data = await res.json();
    setUserId(data.id); 
  }
  getUser();
}, []);

useEffect(() => {
  if (userId) {
    fetchCounts(userId);
  }
}, [userId]);

  async function fetchCounts(id: number | null) {
    try {
      const body = { userId: id };

      const res = await fetch("/api/candidate/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.status === 1) {
        setlistData(data.data);
      }
    } catch (error) {
      console.error("Error fetching status counts:", error);
    }
  }
  return (
    <div>
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
        }
        .layout {
          display: flex;
          background: #f5f5f5;
          min-height: 100vh;
        }
        .sidebar {
          width: 240px;
          background: #0A6C85;
          color: white;
          display: flex;
          flex-direction: column;
          padding: 20px 0;
        }
        .sidebar h2 {
          text-align: center;
          margin-bottom: 30px;
        }
        .menu a {
          display: block;
          padding: 12px 20px;
          text-decoration: none;
          color: #cfcfcf;
          transition: 0.2s;
        }
        .menu a:hover {
          background: #34344a;
          color: #fff;
        }
        .main {
          flex: 1;
          padding: 30px;
        }
        .card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
      `}</style>

      <div className="layout">
        <aside className="sidebar">
          <div style={{ "padding": '0 3.75rem' }}><img src="/assets/images/home/footer-logo.webp" alt="Logo" className="img-fluid" /></div>

          <nav className="menu">
            <a href="/user">Dashboard</a>
            <a href="/user/my-profile">My Profile</a>
            <a href="#" onClick={(e) => { e.preventDefault(); logout("user"); }}>Logout</a>
          </nav>
        </aside>

        <main className="main">
          <div className="card">
            <h1>Welcome to User Profile</h1>
            <p>View profile of your relatives</p>
            <div
              style={{
                display: "flex",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              {listData && listData.length > 0 ?
              listData.map((candidate, index) => (
              // <a href="/user/resident-list?id=${listData.id}" style={{ textDecoration: 'none' }} key={index}>
              <>
                <div
                  style={{
                    flex: 1,
                    background: "#0A6C85",
                    color: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    textAlign: "center",
                    textDecoration: 'none'
                  }}
               onClick={() => router.push(`/user/resident-profile?id=${candidate.id}`)} key={index} >
                  <h3 style={{ margin: 0, fontSize: "18px" }}>{candidate.name}</h3>
                  <p style={{ margin: "10px 0 0 0", fontSize: "22px", fontWeight: "bold" }}>
                    view
                  </p>
                </div>
              {/* // </a> */}
              </>
            )): <p>No candidate data available.</p>}
              
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}