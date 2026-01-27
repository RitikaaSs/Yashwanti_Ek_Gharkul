"use client";
import { logout } from "@/app/pro_utils/constantFun";
import moment from "moment";
import { useEffect, useState, useCallback } from "react";

interface EnquiryDataModel {
    id: number
    full_name: string
    email: string
    preferred_date: string
    phone_number: string
    preferred_time_slot: string
    purpose_of_visit: string
    number_of_visitors: number
    status: string
    created_at: string
}

export default function VisitRequestList() {
    const [visitData, setvisitData] = useState<EnquiryDataModel[]>([]);
    const [purpose, setPurpose] = useState("all");
    const [date, setDate] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const fetchList = useCallback(async () => {
        try {
            const res = await fetch("/api/book_visit_list", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    purpose,
                    date,
                    page,
                    limit: 10,
                }),
            });

            const data = await res.json();

            if (data.status === 1) {
                setvisitData(data.data);
                setTotalPages(data.pagination.totalPages);
            }
        } catch (error) {
            console.error("Error fetching visit requests:", error);
        }
    }, [purpose, date, page]);

    const handleStatus = async (id: number, status: string) => {
        try {
            const res = await fetch("/api/book_visit_status", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            });

            const data = await res.json();

            if (data.status === 1) {
                // update UI instantly
                setvisitData(prev =>
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



    useEffect(() => {
        fetchList();
    }, [fetchList]);


    const resetFilters = () => {
        setPurpose("all");
        setDate("");
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
                        <h2>Visit Requests</h2>
                        <div className="container">
                            <div className="row ">
                                <div className="col-lg-12">
                                    <div className="row mb-4">
                                        <div className="col-lg-12" style={{ textAlign: "right", display: "flex", justifyContent: "flex-end" }}>
                                            <div className="row">
                                                <div className="col-lg-4">
                                                    <select
                                                        className="form-control"
                                                        value={purpose}
                                                        onChange={(e) => {
                                                            setPurpose(e.target.value);
                                                            setPage(1);
                                                        }}
                                                    >
                                                        <option value="all">All Purpose</option>
                                                        <option value="Family">Family</option>
                                                        <option value="Visit">Visit</option>
                                                        <option value="Resident Admission Inquiry">Resident Admission Inquiry</option>
                                                        <option value="Volunteering">Volunteering</option>
                                                        <option value="Donation">Donation</option>
                                                        <option value="CSR Partnership">CSR Partnership</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>

                                                <div className="col-lg-4">
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        value={date}
                                                        onChange={(e) => {
                                                            setDate(e.target.value);
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
                                                    <div className="col-lg-1 text-center"><div className="label">Contact info</div></div>
                                                    <div className="col-lg-2 text-center"><div className="label">Visit date</div></div>
                                                    <div className="col-lg-1 text-center"><div className="label">Time slot</div></div>
                                                    <div className="col-lg-2 text-center"><div className="label">Purpose</div></div>
                                                    <div className="col-lg-1 text-center"><div className="label">Visitors</div></div>
                                                    <div className="col-lg-1 text-center"><div className="label">Status</div></div>
                                                </div>
                                                {visitData && visitData.length > 0 ?
                                                    visitData.map((list, index) => (
                                                        <div className="row list_listbox" style={{ alignItems: "center", cursor: "pointer" }} key={index} onClick={() => { }}>
                                                            <div className="col-lg-2 text-center"><div className="label">{list.full_name}</div></div>
                                                            <div className="col-lg-2 text-center"><div className="label">{list.email}</div></div>
                                                            <div className="col-lg-1 text-center"><div className="label">{list.phone_number}</div></div>
                                                            <div className="col-lg-2 text-center"><div className="label">{moment(list.preferred_date).format('DD-MM-YYYY')}</div></div>
                                                            <div className="col-lg-1 text-center"><div className="label">{list.preferred_time_slot}</div></div>
                                                            <div className="col-lg-2 text-center"><div className="label">{list.purpose_of_visit}</div></div>
                                                            <div className="col-lg-1 text-center"><div className="label">{list.number_of_visitors}</div></div>
                                                            <div className="col-lg-1 text-center">
                                                                {list.status ? (
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
                                                                        <option value="">Status</option>
                                                                        <option value="Visited">Visited</option>
                                                                        <option value="Not visited">Not visited</option>
                                                                    </select>
                                                                )}
                                                            </div>
                                                        </div>)) :
                                                    <>No Visits Available</>
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
