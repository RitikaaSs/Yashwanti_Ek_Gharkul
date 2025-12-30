"use client";

export default function AdminLayout() {
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
          <div style={{"padding": '0 3.75rem'}}><img src="/assets/images/home/footer-logo.webp" alt="Logo" className="img-fluid" /></div>
          
          <nav className="menu">
            <a href="#">Dashboard</a>
            <a href="#">Relatives</a>
            <a href="#">Logout</a>
          </nav>
        </aside>

        <main className="main">
          <div className="card">
            <h1>Welcome to User Profile</h1>
            <p>This is a simple user panel layout using inline CSS styles in Next.js.</p>
          </div>
        </main>
      </div>
    </div>
  );
}