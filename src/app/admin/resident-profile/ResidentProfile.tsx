

"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import moment from "moment";
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
interface userDataModel {
    full_name: string
    email: string
    phone_number: string
    address: string
}
export default function ResidentProfile() {
    const [listData, setlistData] = useState<CandidateDataModel>();
    const [userData, setUserData] = useState<userDataModel>();
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
                console.log("Profile data:", data);
                setlistData(data.data.personal_details[0]);
                setUserData(data.data.user_details[0]);
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
                        <a href="/admin/user-list">Users</a>
                        <a href="#">Visit requests</a>
                        <a href="/admin/enquiries">Enquiries</a>
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
                                        <div className="d_user_profile_heading">Basic Details</div>
                                        <div className="d_user_profile_details_listing_box">
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Name</div>
                                                <div className="d_user_profile_details_content">{listData?.name || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Age</div>
                                                <div className="d_user_profile_details_content">{listData?.age || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">DOB</div>
                                                <div className="d_user_profile_details_content">{moment(listData?.date_of_birth).format('DD-MM-YYYY') || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Marital Status</div>
                                                <div className="d_user_profile_details_content">{listData?.marital_status || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Blood group</div>
                                                <div className="d_user_profile_details_content">{listData?.blood_group || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Education</div>
                                                <div className="d_user_profile_details_content">{listData?.education || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Profession</div>
                                                <div className="d_user_profile_details_content">{listData?.profession || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Hobbies</div>
                                                <div className="d_user_profile_details_content">{listData?.hobbies || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Guardian</div>
                                                <div className="d_user_profile_details_content">{listData?.user_id || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Address</div>
                                                <div className="d_user_profile_details_content">{listData?.address || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Health Data</div>
                                                <div className="d_user_profile_details_content">{listData?.health_data || "--"}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d_user_new_details_mainbox">
                                        <div className="d_user_profile_heading">User/Guardian Details</div>

                                        <div className="d_user_profile_details_listing_box">

                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Name	</div>
                                                <div className="d_user_profile_details_content">{userData?.full_name || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Email ID</div>
                                                <div className="d_user_profile_details_content">{userData?.email || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Contact info</div>
                                                <div className="d_user_profile_details_content">{userData?.phone_number || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Address</div>
                                                <div className="d_user_profile_details_content">{userData?.address || "--"}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d_user_new_details_mainbox">
                                        <div className="d_user_profile_heading">Medical Records</div>

                                        <div className="d_user_profile_details_listing_box">

                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Diagnosis	</div>
                                                <div className="d_user_profile_details_content">{listData?.education || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Medications</div>
                                                <div className="d_user_profile_details_content">{listData?.profession || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Doctor&apos;s Note</div>
                                                <div className="d_user_profile_details_content">{listData?.hobbies || "--"}</div>
                                            </div>
                                            <div className="d_user_profile_details_listing">
                                                <div className="d_user_profile_details_subheading">Record Date</div>
                                                <div className="d_user_profile_details_content">{listData?.user_id || "--"}</div>
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