"use client";
import { logout } from "@/app/pro_utils/constantFun";
import { staticIconsBaseURL } from "@/app/pro_utils/string_constants";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CandidateDataModel {
    id: number
    user_id: number
    name: string
    date_of_birth: string
    age: number
    marital_status: string
    gender: string
    blood_group: string
    relationship_with_applicant: string
    address: string
    education: string
    profession: string
    hobbies: string
    volunteer_interest: number
    volunteer_details: string
    health_data: string
    status: string
    updated_at: string
    reviewer_id: string
    approver_id: string
}
export default function OnHoldList() {
    const [listData, setlistData] = useState<CandidateDataModel[]>();
    const router = useRouter();

    useEffect(() => {
        async function fetchCounts(status: string) {
            try {
                const res = await fetch("/api/candidate/list", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status }),
                });

                const data = await res.json();

                if (data.status === 1) {
                    setlistData(data.data);
                }
            } catch (error) {
                console.error("Error fetching status counts:", error);
            }
        }

        fetchCounts("On hold");
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
                        <a href="#"  onClick={(e) => { e.preventDefault(); logout("admin"); }}>Logout</a>
                    </nav>
                </aside>

                <main className="main">
                    <div className="card">
                        <h2>On Hold Applications</h2>
                        <div className="container">
                            <div className="row ">
                                <div className="col-lg-12">
                                    <div className="row" id="top">
                                        <div className="col-lg-12 mb-3">
                                        </div>
                                    </div>
                                    {listData && listData.length > 0 ? <>
                                    <div className="row mb-5">
                                        <div className="col-lg-12">
                                            <div className="grey_box" style={{ backgroundColor: "#fff" }} >
                                                <div className="row list_label mb-4">
                                                    <div className="col-lg-3 text-center"><div className="label">Name</div></div>
                                                    <div className="col-lg-2 text-center"><div className="label">Date of birth</div></div>
                                                    <div className="col-lg-2 text-center"><div className="label">Age</div></div>
                                                    <div className="col-lg-2 text-center"><div className="label">Gender</div></div>
                                                    <div className="col-lg-2 text-center"><div className="label">Blood type</div></div>
                                                    <div className="col-lg-1 text-center"><div className="label">Action</div></div>
                                                </div>

                                                {/* {listData && listData.length > 0 && */}
                                                    {listData.map((list, index) => (
                                                        <div className="row list_listbox" style={{ alignItems: "center", cursor: "pointer" }} key={index} onClick={() => { }}>
                                                            <div className="col-lg-3 text-center"><div className="label">{list.name}</div></div>
                                                            <div className="col-lg-2 text-center"><div className="label">{moment(list.date_of_birth).format('DD-MM-YYYY')}</div></div>
                                                            <div className="col-lg-2 text-center"><div className="label">{list.age}</div></div>
                                                            <div className="col-lg-2 text-center"><div className="label">{list.gender}</div></div>
                                                            <div className="col-lg-2 text-center"><div className="label">{list.blood_group}</div></div>
                                                            <div className="col-lg-1 text-center"><div className="label" onClick={() => {
                                                                router.push(`/admin/onhold-list/profile?id=${list.id}`)
                                                            }}><img src={staticIconsBaseURL + "/images/admin/view_icon.png"} alt="view icon" className="img-fluid" style={{ maxHeight: "18px" }} /></div></div>
                                                        </div>))}
                                                        {/* } */}
                                            </div>
                                        </div>
                                    </div>
                                    </> : <div style={{ textAlign: "center", padding: "50px", fontSize: "18px" }}>No on hold applications found.</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}