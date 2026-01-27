// from admin side the password must be reset for the user, after reset the new password will be the users current contact number, want alert message for the admin once reset is done thru "reset password" text
// want a reset api too
"use client";
import { logout } from "@/app/pro_utils/constantFun";
import { staticIconsBaseURL } from "@/app/pro_utils/string_constants";
// import moment from "moment";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
// import { CandidateDataModel } from "../../datamodels/candidateListDataModel";
interface UserDataModel {
    id: number
    full_name: string
    email: string
    address: string
    phone_number: string
}
export default function UserList() {
    const [userData, setUserData] = useState<UserDataModel[]>();
    const router = useRouter();
    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        async function fetchList() {
            try {
                const res = await fetch("/api/user_list", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        search,
                        page,
                    }),
                });

                const data = await res.json();

                if (data.status === 1) {
                    setUserData(data.data);
                    setTotalPages(data.pagination.totalPages);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }

        fetchList();
    }, [search, page]);

    const resetFilters = () => {
        setSearch("");
        setPage(1);
    };

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
                        <h2>User list</h2>
                        <div className="container">
                            <div className="row ">
                                <div className="col-lg-12">
                                    <div className="row mb-4">

                                        <div className="col-lg-12" style={{ textAlign: "right", display: "flex", justifyContent: "flex-end" }}>
                                            <div className="row"  >
                                                <div className="col-lg-8">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Search by name"
                                                        value={search}
                                                        onChange={(e) => {
                                                            setSearch(e.target.value);
                                                            setPage(1);
                                                        }}
                                                    />
                                                </div>
                                                <div className="col-lg-4">
                                                    <button className="btn btn-secondary w-100" onClick={resetFilters}>
                                                        Reset
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row mb-5">
                                        <div className="col-lg-12">
                                            <div className="grey_box" style={{ backgroundColor: "#fff" }} >
                                                <div className="row list_label mb-4">
                                                    <div className="col-lg-2 text-center"><div className="label">Name</div></div>
                                                    <div className="col-lg-2 text-center"><div className="label">Email Id</div></div>
                                                    <div className="col-lg-2 text-center"><div className="label">Contact info</div></div>
                                                    <div className="col-lg-3 text-center"><div className="label">Address</div></div>
                                                    <div className="col-lg-2 text-center"><div className="label">Related resident</div></div>
                                                </div>

                                                {userData && userData.length > 0 ?
                                                    userData.map((list, index) => (
                                                        <div className="row list_listbox" style={{ alignItems: "center", cursor: "pointer" }} key={index} onClick={() => { }}>
                                                            <div className="col-lg-2 text-center"><div className="label">{list.full_name}</div></div>
                                                            <div className="col-lg-2 text-center"><div className="label">{list.email}</div></div>
                                                            <div className="col-lg-2 text-center"><div className="label">{list.phone_number}</div></div>
                                                            <div className="col-lg-3 text-center"><div className="label">{list.address}</div></div>
                                                            <div className="col-lg-2 text-center"><div className="label" onClick={() => {
                                                                router.push(`/admin/resident-list?user_id=${list.id}`)
                                                            }}><img src={staticIconsBaseURL + "/images/admin/view_icon.png"} alt="view icon" className="img-fluid" style={{ maxHeight: "18px" }} /></div></div>
                                                            <div
                                                                className="col-lg-1 text-center"
                                                                style={{ color: "red", cursor: "pointer" }}
                                                                onClick={async (e) => {
                                                                    e.stopPropagation();

                                                                    const confirmReset = confirm(
                                                                        `Reset password for ${list.full_name}?`
                                                                    );

                                                                    if (!confirmReset) return;

                                                                    const res = await fetch("/api/reset_user_password", {
                                                                        method: "POST",
                                                                        headers: { "Content-Type": "application/json" },
                                                                        body: JSON.stringify({ user_id: list.id }),
                                                                    });

                                                                    const data = await res.json();

                                                                    if (data.status === 1) {
                                                                        alert("Password reset successfully");
                                                                    } else {
                                                                        alert(data.error || "Failed to reset password");
                                                                    }
                                                                }}
                                                            >
                                                                <div className="label">Reset password</div>
                                                            </div>

                                                        </div>))
                                                    : <>No User available</>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end mt-4 gap-2" style={{ fontSize: "12px" }}>
                                        <button
                                            className="btn btn-outline-primary"
                                            disabled={page === 1}
                                            onClick={() => setPage(page - 1)}
                                            style={{ fontSize: "12px" }}>
                                            Previous
                                        </button>

                                        <span className="align-self-center">
                                            Page {page} of {totalPages}
                                        </span>

                                        <button
                                            className="btn btn-outline-primary"
                                            disabled={page === totalPages}
                                            onClick={() => setPage(page + 1)}
                                            style={{ fontSize: "12px" }}>
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
