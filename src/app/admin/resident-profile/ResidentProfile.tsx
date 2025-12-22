

"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
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
export default function ResidentProfile() {
    const [listData, setlistData] = useState<CandidateDataModel[]>();
    // const [medData, setMedData] = useState<CandidateMedicalDataModel[]>();
const searchParams = useSearchParams();
  const id = searchParams.get("id");
     useEffect(() => {
    if (!id) return;

    async function fetchProfile() {
      const res = await fetch("/api/candidate/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (data.status === 1) {
        setlistData(data.personal_details[0]);
        // setMedData(data.medical_record);
      }
    }

    fetchProfile();
  }, [id]);


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
                        <a href="#">Users</a>
                        <a href="#">Visit requests</a>
                        <a href="#">Enquiries</a>
                        <a href="#">Logout</a>
                    </nav>
                </aside>

                <main className="main">
                    <div className="card">
                        <h2>Candidate Profile</h2>
                        <div className="container" id='employement_id'>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="d_user_new_details_mainbox">
                                        <div className="d_user_profile_heading">Employment Details</div>
                                        <div className="d_user_profile_details_listing_box">
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Employee ID</div>
                                                <div className="d_user_profile_details_content">{listData?.[0].name || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Designation</div>
                                                <div className="d_user_profile_details_content">{"--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Department</div>
                                                <div className="d_user_profile_details_content">{"--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Reporting Manager</div>
                                                <div className="d_user_profile_details_content">{"--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Employment Type</div>
                                                <div className="d_user_profile_details_content">{"--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Branch</div>
                                                <div className="d_user_profile_details_content">{"--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Work Mode</div>
                                                <div className="d_user_profile_details_content">{"--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Work Location</div>
                                                <div className="d_user_profile_details_content">{"--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Date of Joining</div>
                                                <div className="d_user_profile_details_content">{"--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Official email</div>
                                                <div className="d_user_profile_details_content">{"--"}</div>
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