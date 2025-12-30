"use client";
// import { staticIconsBaseURL } from "@/app/pro_utils/string_constants";
import moment from "moment";
import { useEffect, useState } from "react";

interface EnquiryDataModel {
    id: number
    full_name: string
    email: string
    preferred_date: string
    phone_number: string
    preferred_time_slot: string
    purpose_of_visit: string
    number_of_visitors: number
    created_at: string
}
export default function VisitRequestList() {
    const [visitData, setvisitData] = useState<EnquiryDataModel[]>();
    // const router = useRouter();

    useEffect(() => {
        async function fetchList() {
            try {
                const res = await fetch("/api/book_visit_list", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" }
                });

                const data = await res.json();

                if (data.status === 1) {
                    setvisitData(data.data);
                }
            } catch (error) {
                console.error("Error fetching status counts:", error);
            }
        }

        fetchList();
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
                        <a href="#">Logout</a>
                    </nav>
                </aside>

                <main className="main">
                    <div className="card">
                        <h2>Enquiries</h2>
                        <div className="container">
                            <div className="row ">
                                <div className="col-lg-12">
                                    <div className="row" id="top">
                                        <div className="col-lg-12 mb-3">
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
                                                    <div className="col-lg-2 text-center"><div className="label">Number of visitors</div></div>
                                                </div>

                                                {visitData && visitData.length > 0 &&
                                                    visitData.map((list, index) => (
                                                        <div className="row list_listbox" style={{ alignItems: "center", cursor: "pointer" }} key={index} onClick={() => { }}>
                                                            <div className="col-lg-2 text-center"><div className="label">{list.full_name}</div></div>
                                                            <div className="col-lg-2 text-center"><div className="label">{list.email}</div></div>
                                                            <div className="col-lg-1 text-center"><div className="label">{list.phone_number}</div></div>
                                                            <div className="col-lg-2 text-center"><div className="label">{moment(list.preferred_date).format('DD-MM-YYYY')}</div></div>
                                                            <div className="col-lg-1 text-center"><div className="label">{list.preferred_time_slot}</div></div>
                                                            <div className="col-lg-2 text-center"><div className="label">{list.purpose_of_visit}</div></div>
                                                            <div className="col-lg-2 text-center"><div className="label">{list.number_of_visitors}</div></div>
                                                        </div>))}
                                            </div>
                                        </div>
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
