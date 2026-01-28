"use client";
import { logout } from "@/app/pro_utils/constantFun";
import moment from "moment";
import { useEffect, useState } from "react";
interface EnquiryDataModel {
    id: number
    full_name: string
    email: string
    subject: string
    phone_number: string
    message: string
    status: string
    submitted_at: string
}
export default function EnquiryList() {
    const [enquiryData, setenquiryDataData] = useState<EnquiryDataModel[]>([]);
    const [subject, setSubject] = useState("all");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function fetchList() {
            try {

                const res = await fetch("/api/enquiry_form_list", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        subject,
                        page,
                    }),
                });

                const data = await res.json();

                if (data.status === 1) {
                    setenquiryDataData(data.data);
                    setTotalPages(data.pagination.totalPages);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchList();
    }, [subject, page]);

    const resetFilters = () => {
        setSubject("all");
        setPage(1);
    };
    const handleStatus = async (id: number, status: string) => {
        try {
            const res = await fetch("/api/enquiry_form_status", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            });

            const data = await res.json();

            if (data.status === 1) {
                // update UI instantly
                setenquiryDataData(prev =>
                    prev.map(item =>
                        item.id === id ? { ...item, status } : item
                    )
                );
            } else {
                alert(data.error || "Something went wrong!");
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
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
                        <h2>Enquiries</h2>
                        <div className="container">
                            <div className="row ">
                                <div className="col-lg-12">
                                    <div className="row mb-4">

                                        <div className="col-lg-12" style={{ textAlign: "right", display: "flex", justifyContent: "flex-end" }}>
                                            <div className="row"  >
                                                <div className="col-lg-6">
                                                    <select
                                                        className="form-control"
                                                        value={subject}
                                                        onChange={(e) => {
                                                            setSubject(e.target.value);
                                                            setPage(1);
                                                        }}
                                                    >
                                                        <option value="all">Select subject</option>
                                                        <option value="General Query">General Query</option>
                                                        <option value="Feedback">Feedback</option>
                                                        <option value="Collaboration">Collaboration</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                                <div className="col-lg-6">
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
                                                    <div className="col-lg-1 text-center"><div className="label">Contact info</div></div>
                                                    <div className="col-lg-2 text-center"><div className="label">Subject</div></div>
                                                    <div className="col-lg-3 text-center"><div className="label">Message</div></div>
                                                    <div className="col-lg-1 text-center"><div className="label">Date</div></div>
                                                    <div className="col-lg-1 text-center"><div className="label">Status</div></div>
                                                </div>

                                                {enquiryData && enquiryData.length > 0 ?
                                                    enquiryData.map((list, index) => (
                                                        <div className="row list_listbox" style={{ alignItems: "center", cursor: "pointer" }} key={index} onClick={() => { }}>
                                                            <div className="col-lg-2 text-center"><div className="label">{list.full_name}</div></div>
                                                            <div className="col-lg-2 text-center"><div className="label">{list.email}</div></div>
                                                            <div className="col-lg-1 text-center"><div className="label">{list.phone_number}</div></div>
                                                            <div className="col-lg-2 text-center"><div className="label">{list.subject}</div></div>
                                                            <div className="col-lg-3 text-center"><div className="label">{list.message}</div></div>
                                                            <div className="col-lg-1 text-center"><div className="label">{moment(list.submitted_at).format('DD-MM-YYYY')}</div></div>
                                                            <div className="col-lg-1 text-center">
                                                                {list.status!= "New" ? (
                                                                    <div className="label">{list.status}</div>
                                                                ) : (
                                                                    <select
                                                                        className="form-control"
                                                                        defaultValue=""
                                                                        onChange={(e) => {
                                                                            const value = e.target.value;
                                                                            if (value) {
                                                                                handleStatus(list.id, value);
                                                                            }
                                                                        }}
                                                                    >
                                                                        <option value="New">New</option>
                                                                        <option value="Contacted"> </option>
                                                                    </select>
                                                                )}
                                                            </div>

                                                        </div>)) : <>No Enquiries Available</>
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
