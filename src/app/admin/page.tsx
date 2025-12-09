export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1D4ED8] text-white flex flex-col py-6 shadow-xl">

        {/* Logo */}
        <div className="text-2xl font-semibold px-6 mb-10">Gharkul Admin</div>

        {/* Navigation Menu */}
        <nav className="flex-1 space-y-1 px-4">

          <a href="/admin/candidates" className="block py-3 px-4 rounded hover:bg-blue-700 transition">
            Candidates
          </a>

          <a href="/admin/applications" className="block py-3 px-4 rounded hover:bg-blue-700 transition">
            Applications
          </a>

          <a href="/admin/users" className="block py-3 px-4 rounded hover:bg-blue-700 transition">
            Users
          </a>

          <a href="/admin/settings" className="block py-3 px-4 rounded hover:bg-blue-700 transition">
            Settings
          </a>

        </nav>

        {/* Footer (like screenshot bottom) */}
        <div className="mt-auto px-6 py-4 text-sm border-t border-blue-500/40">
          Admin User
        </div>

      </aside>


      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

        {/* Example card */}
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-700">Welcome to the Gharkul Admin Panel.</p>
        </div>
      </main>

    </div>
  );
}
