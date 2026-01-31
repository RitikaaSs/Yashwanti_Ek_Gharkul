"use client";
import { useEffect, useState } from "react";
import { logout } from "../pro_utils/constantFun";

export default function AdminDashboard() {
  const [approved, setApproved] = useState(0);
  const [onHold, setOnHold] = useState(0);
  const [disapproved, setDisapproved] = useState(0);
  const [tEnquiry, setEnquiry] = useState(0);
  const [tVisits, setVisits] = useState(0);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const res = await fetch("/api/candidate/total_count", {
          method: "POST",
        });
        const data = await res.json();
        if (data.status === 1) {
          setApproved(data.approved);
          setOnHold(data.on_hold);
          setDisapproved(data.disapproved);
          setEnquiry(data.enquiries);
          setVisits(data.visits);
          // setRejected(data.rejected);
        }
      } catch (error) {
        console.error("Error fetching status counts:", error);
      }
    }

    fetchCounts();
  }, []);

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
            <a href="/admin">Dashboard</a>
            <a href="/admin/resident-list">Resident List</a>
            <a href="/admin/user-list">Relatives</a>
            <a href="/admin/visit-requests">Visit requests</a>
            <a href="/admin/enquiries">Enquiries</a>
            <a href="#" onClick={(e) => { e.preventDefault(); logout("admin"); }}>Logout</a>
          </nav>
        </aside>
        <main className="main">
          <div className="card">
            <h1>Welcome to Admin Panel</h1>

            {/* Stats Cards Container */}
            <div
              style={{
                display: "flex",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              {/* Card 1 */}
              <a href="/admin/resident-list" style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    flex: 1,
                    background: "#0A6C85",
                    color: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: "18px" }}>TOTAL RESIDENTS</h3>
                  <p style={{ margin: "10px 0 0 0", fontSize: "22px", fontWeight: "bold" }}>
                    {approved}
                  </p>
                </div>
              </a>

              {/* Card 2 */}
              <a href="/admin/onhold-list" style={{ textDecoration: 'none', cursor: "pointer" }}>
                <div
                  style={{
                    flex: 1,
                    background: "#0A6C85",
                    color: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: "18px" }}>RECEIVED APPLICATIONS</h3>
                  <p style={{ margin: "10px 0 0 0", fontSize: "22px", fontWeight: "bold" }}>
                    {onHold}
                  </p>
                </div>
              </a>
              <a href="/admin/disapproved-list" style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    flex: 1,
                    background: "#0A6C85",
                    color: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: "18px" }}>REJECTED APPLICATIONS</h3>
                  <p style={{ margin: "10px 0 0 0", fontSize: "22px", fontWeight: "bold" }}>
                    {disapproved}
                  </p>
                </div>
              </a>
              {/* Card 3 */}
              <a href="/admin/enquiries" style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    flex: 1,
                    background: "#0A6C85",
                    color: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: "18px" }}>TODAY&apos;S ENQUIRY</h3>
                  <p style={{ margin: "10px 0 0 0", fontSize: "22px", fontWeight: "bold" }}>
                    {tEnquiry}
                  </p>
                </div>
              </a>
              {/* visits card */}
              <a href="/admin/visit-requests" style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    flex: 1,
                    background: "#0A6C85",
                    color: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: "18px" }}>TODAY&apos;S VISITS</h3>
                  <p style={{ margin: "10px 0 0 0", fontSize: "22px", fontWeight: "bold" }}>
                    {tVisits}
                  </p>
                </div>
              </a>


            </div>
          </div>
        </main>
      </div>
    </div>
  );
}